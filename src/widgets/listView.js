/**
 * Created by cly on 2017/6/8.
 */

"use strict";
import React,{PropTypes,PureComponent} from "react";
import {View,ListView,TouchableOpacity, PixelRatio,StyleSheet} from "react-native";
import enhanceProps from "../utils/enhanceProps";
import { observable, autorun, action, computed, toJS } from 'mobx';
import { observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
//滚动条移动多少显示置顶按钮
const SHOW_TOP_BTN_TOP = 200;

class ListViewLogic{

  @observable
  showTopBtn = false;

  @action
  setShowTopBtn(value:true){
    this.showTopBtn = value;
  }

}


//无状态组件
const TopButton = observer(function ({logic,onPress},context) {
  if(logic.showTopBtn){
    return (
      <TouchableOpacity onPress={onPress} style={styles.topButton}>
        <Ionicons name='ios-arrow-round-up' size={35} color="#000000"/>
      </TouchableOpacity>
    );
  }
  return <View/>;
});



@observer
export default class ListViewNew extends PureComponent{

  listViewLogic = new ListViewLogic();

  static defaultProps = {
    topBtn:false,
    section:false,
    customSection:false,
  };

  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]).isRequired, //数据源
    renderRow:React.PropTypes.func,   //渲染列表

    renderSeparator: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    renderSectionHeader:React.PropTypes.func,

    topBtn:React.PropTypes.bool, //是否显示topButton
    section:React.PropTypes.bool, //是否携带标题
    customSection:React.PropTypes.bool //是否携带标题,并自定义dataBlob提取规则
  };


  constructor(props){
    super(props);
    this.ds = {};
    if(props.customSection){
      let getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
      };
      let getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[rowID];
      };

      this.ds = new ListView.DataSource({
        getRowData: getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
    }
    else if(props.section){
      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged:(s1,s2)=> s1!= s2
      });
    }
    else{
      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
    }
  }

  //获得主题属性
  prepareRootProps() {
    let type = {
      backgroundColor:"#ffffff",//背景色
      flex:1
    };//主题布局属性
    let defaultProps = {
      style: type,
    };
    return enhanceProps(this.props, defaultProps);
  }

  render(){
    let dataSource = {};
    if(this.props.customSection){
      let {dataBlob, sectionIDs, rowIDs} = this.props.data;
      dataSource = this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    }
    else if(this.props.section){
      dataSource = this.ds.cloneWithRowsAndSections(this.props.data)
    }
    else{
      //console.log("渲染，",this.props.data.slice());
      const items = toJS(this.props.data);
      dataSource = this.ds.cloneWithRows(items);
    }


    return (
      <View  {...this.prepareRootProps()}>
        <ListView
          ref="listView"
          dataSource={dataSource}
          renderRow={this.props.renderRow}
          renderHeader={this._renderHeaderView}
          renderFooter={this._renderFooterView}
          renderSeparator={this._renderSeparatorView}
          renderSectionHeader={this._renderSectionHeaderView}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={true}
          canCancelContentTouches={true}
          removeClippedSubviews={true}
          initialListSize={3}
          pageSize={1}
          scrollRenderAheadDistance={200}
          refreshControl={this.props.refreshable === true ? this._renderRefreshControl() : null}
          onScroll={this._onScroll}
        />

        {this.props.topBtn && <TopButton logic={this.listViewLogic}  onPress={this._scrollTop} />}

      </View>

    );
  }


  //滚回顶部
  _scrollTop = ()=> {
    return this.refs.listView.scrollTo({y: 0});
  }

  _onScroll = (event)=>{
    if(!this.props.topBtn) return;
    //为了增加效率,仅有在必要情况下才调用setState
    if(event.nativeEvent.contentOffset.y > SHOW_TOP_BTN_TOP && !this.state.showTopBtn){
      this.listViewLogic.setShowTopBtn(true);
    } else if(event.nativeEvent.contentOffset.y <= SHOW_TOP_BTN_TOP && this.state.showTopBtn){
      this.listViewLogic.setShowTopBtn(false);
    }
  }

  //渲染头部
  _renderHeaderView =()=> {
    if (!this.props.renderHeader){return null;}
    return this.props.renderHeader();
  }

  //渲染分割线
  _renderSeparatorView = (sectionID, rowID, adjacentRowHighlighted)=> {
    if (this.props.renderSeparator) {
      return this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted);
    }

    // return <Spacer key={rowID} distance={1} />;
    return (
      <View key={rowID} style={{height: 1.0 / PixelRatio.get(),
        backgroundColor: '#E2E2E2',
        marginLeft:10,
        marginRight:10,
      }} />
    );
  }

  //渲染磁性头
  _renderSectionHeaderView = (sectionData,sectionID)=>{
    if(!this.props.renderSectionHeader){return null};
    return this.props.renderSectionHeader(sectionData,sectionID);
  }

  //渲染底部view
  _renderFooterView = ()=>{
    if(!this.props.renderFooter){return null};
    return this.props.renderFooter();
  }


}

const styles = StyleSheet.create({
  topButton:{
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right:5,
    bottom:95,
    width:55,
    height:55,
    backgroundColor:'rgba(0,0,0,0)',
  },
  topBottomImg: {
    width:40,
    height:40,
  }
});