/**
 *
 * 带下拉刷新的列表
 * Created by cly on 2017/6/12.
 */

"use strict";
import React,{PropTypes,PureComponent} from "react";
import {View,ListView,PixelRatio,StyleSheet,RefreshControl,Text,ActivityIndicator,TouchableOpacity} from "react-native";
import enhanceProps from "../utils/enhanceProps";
import { observable, autorun, action, computed, toJS } from 'mobx';
import { observer } from 'mobx-react';
import theme from "../core/theme";
import _ from "lodash";
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';

//滚动条移动多少显示置顶按钮
const SHOW_TOP_BTN_TOP = 200;


/**
 * refreshListView的logic
 */
class ListViewLogic{
  @observable
  isRefreshing =  false;
  @observable
  isLoadingMore = false;
  @observable
  showTopBtn = false; //判断是否显示置顶按钮
  @observable
  paginationStatus = 'nothing'; //上拉加载状态
  @observable
  refreshStatus =  'waiting'; // header 下拉刷新状态，
  @computed
  get isLoading(){
    if(this.isRefreshing || this.isLoadingMore)
      return true;
    return false; //是否处于下载中
  }

  @action
  setShowTopBtn(value:true){
    this.showTopBtn = value;
  }

  @action
  setRefreshStatus(status){
    this.refreshStatus = status;
  }

  @action
  setIsRefreshing(value){
    this.isRefreshing = value;
  }

  @action
  setPaginationStatus(status){
    this.paginationStatus = status;
  }
  @action
  setIsLoadingMore(value){
    this.isLoadingMore = value;
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

//无状态组件RefreshControl
const defaultRefreshProps = {
  tintColor: theme.colorPrimary,
  titleColor: theme.textColor,
  colors: ['white', 'black', 'green'],
  progressBackgroundColor: "red",
  refreshableBackgroundColor:"transparent", //默认 刷新区域背景色
};
const RefreshControlNew = observer(function ({refreshProps,logic,onRefresh,refreshTime}) {
  //获得下拉刷新的属性和样式
  let props =  _.merge(defaultRefreshProps,refreshProps);
  return (<RefreshControl
    refreshing={logic.isRefreshing}
    onRefresh={onRefresh}
    tintColor={props.tintColor}
    title={"最后更新: "+refreshTime}
    titleColor={props.titleColor}
    colors={props.colors}
    progressBackgroundColor={props.progressBackgroundColor}
  />);
})

//获得Footer的样式
function getFooterProps(footerProps){
  let defaultProps = {
    style:      styles.footer,
    titleSize:  theme.textFontSizeBase,
    titleColor: theme.colorText,
    color:      theme.colorPrimary,
  };
  return enhanceProps(footerProps, defaultProps);
}

let FooterViewTime = 0;
//无状态组件FooterView
const FooterView = observer(function ({footerProps,logic,onLoadMore,hasMore}) {
  FooterViewTime = FooterViewTime+1;
  //console.log("FooterView 渲染%d次",FooterViewTime);
  //数据为空
  let status = -1;
  if(logic.paginationStatus === 'waiting'){
    status = 1; // 按钮-可加载
  } else if(logic.paginationStatus === 'fetching'){
    status = 2; // 加载中。。。
  } else if(logic.paginationStatus === "allLoaded" || !hasMore){
    status = 3; // 文字-已全部加载
  }

  footerProps = getFooterProps(footerProps);
  if(status === -1){
    return (
      <View style={footerProps.style}>
        <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}} >
          没有数据，请下拉刷新重试
        </Text>
      </View>
    )
  }
  return(
    <View style={footerProps.style}>
      {/** status ===0 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>暂时没有更多数据了，请刷新重试</Text>**/}
      { status ===1 && <TouchableOpacity onPress={onLoadMore}><Text>查看更多</Text></TouchableOpacity>}
      { status ===2 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>努力加载中 </Text>}
      { status ===2 && <ActivityIndicator animating={true}  color={footerProps.color}/>}
      { status ===3 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>已经到底部，没有更多数据了</Text>}
    </View>
  );
});



//带下拉刷新的列表组件
@observer
export default class RefreshListViewNew extends PureComponent{
  listViewLogic = new ListViewLogic();

  static defaultProps = {
    loadMoreEnable:false,  //默认 上拉加载
    refreshEnable:true,   //默认 下拉刷新
    refreshProps:{}, //可定制属性 tintColor:"",progressBackgroundColor:"",titleColor:"",colors:[]
    footerProps:{},   //可定制属性 titleColor:",color:",style:{}
    serverRealTime:"很久以前",
    section:false,
    customSection:false,
  };
  static propTypes = {
    onFetch: React.PropTypes.func.isRequired,//网络请求回调  {lastId:-1},callBack
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]).isRequired, //数据源
    serverRealTime:React.PropTypes.number, //刷新时间
    hasMore:React.PropTypes.bool, //是否存在更多
    renderRow:React.PropTypes.func.isRequired,   //渲染列表

    loadMoreEnable: React.PropTypes.bool, //是否开启加载更多
    refreshEnable: React.PropTypes.bool,  //是否开启下拉刷新

    renderSeparator: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    renderSectionHeader:React.PropTypes.func,

    refreshProps:React.PropTypes.object, //下拉刷新区域布局
    footerProps:React.PropTypes.object,  //底部区域布局

    section:React.PropTypes.bool, //是否携带标题 默认{key1:{},key2:{}} 或者{key1:[],key2:[]}或者[[data1],[data2],[data3]]
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
    } else if(props.section){
      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged:(s1,s2)=> s1!== s2
      });
    }else{
      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
    }
  }


  //执行刷新状态
  _onRefresh = ()=> {
    if(this.listViewLogic.isLoading || !this.props.refreshEnable) return;
    this.listViewLogic.setRefreshStatus('fetching');
    this.listViewLogic.setIsRefreshing(true);
    this.props.onFetch({refresh:true}).then(
      success=>{this._resumeWaitingState()},
      error=>{this._resumeWaitingState()}
    );

  };

  //执行加载更多
  _onLoadMore = ()=> {
    if (!(this.props.loadMoreEnable&&this.props.hasMore && !this.listViewLogic.isLoading) )
      return;
    this.listViewLogic.setPaginationStatus('fetching');
    this.listViewLogic.setIsLoadingMore(true);
    this.props.onFetch({refresh:false}).then(
      success=>{this._resumeWaitingState()},
      error=>{this._resumeWaitingState()}
    );
  };

  _resumeWaitingState(){
    this.listViewLogic.setRefreshStatus('waiting');
    this.listViewLogic.setIsRefreshing(false);
    this.listViewLogic.setIsLoadingMore(false);
    this.listViewLogic.setPaginationStatus(this.props.hasMore ? 'waiting' : 'allLoaded');
  }

  //监听是否到达底部
  handleEndReached = ()=> {
    this._onLoadMore();
  }



  render(){
    // let ds = new ListView.DataSource({
    //   rowHasChanged: (row1, row2) => row1 !== row2
    // });
    let dataSource = {};
    if(this.props.customSection){
      let {dataBlob, sectionIDs, rowIDs} = this.props.data;
      dataSource = this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    }
    else if(this.props.section){
      const items = toJS(this.props.data);
      dataSource = this.ds.cloneWithRowsAndSections(items)
    }
    else{
      const items = toJS(this.props.data);
      dataSource = this.ds.cloneWithRows(items);
    }

    return (
      <View style={[{flex:1,backgroundColor:"#ffffff"},this.props.style]} >
        <ListView
          ref={c=>this._listView = c}
          dataSource={dataSource}
          renderRow={this.props.renderRow}
          renderHeader={this._renderHeaderView}
          renderFooter={this._renderFooterView}
          renderSeparator={this._renderSeparatorView}
          refreshControl={this._getRefreshControl()}
          onEndReached={this.handleEndReached}
          onEndReachedThreshold={30}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={true}
          removeClippedSubviews={true}
          initialListSize={3}
          pageSize={1}
          scrollRenderAheadDistance={200}
          canCancelContentTouches={true}
          scrollEventThrottle = {200}
          onScroll={this._onScroll}
          renderSectionHeader={this.props.renderSectionHeader}
        />
        <TopButton logic={this.listViewLogic}  onPress={()=>this._scrollTop()} />
      </View>

    );
  }

  _onScroll = (event)=>{
    //为了增加效率,仅有在必要情况下才调用setState
    if(event.nativeEvent.contentOffset.y > SHOW_TOP_BTN_TOP && !this.listViewLogic.showTopBtn){
      this.listViewLogic.setShowTopBtn(true);
    } else if(event.nativeEvent.contentOffset.y <= SHOW_TOP_BTN_TOP && this.listViewLogic.showTopBtn){
      this.listViewLogic.setShowTopBtn(false);
    }
  }

  //渲染头部
  _renderHeaderView = ()=> {
    if (!this.props.renderHeader){return null;}
    return this.props.renderHeader();
  }


  //获得RefreshControl组件
  _getRefreshControl(){
    return (
      this.props.refreshEnable?
        <RefreshControlNew
          refreshProps={this.props.refreshProps}
          logic={this.listViewLogic}
          onRefresh = {this._onRefresh}
          refreshTime = {this.timeToShow(this.props.serverRealTime)}
        /> : null);
  }


  timeToShow(time:Number){
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return  h+m+s
  }

  //拼接最后更新时间
  // _getRefreshTime(){
  //   return this.props.data.serverRealTime?this.props.data.serverRealTime:"很久以前"
  // }

  //滚回顶部
  _scrollTop() {
     this._listView.scrollTo({y: 0});
  }


  //渲染分割线
  _renderSeparatorView = (sectionID, rowID, adjacentRowHighlighted)=> {
    if (this.props.renderSeparator) {
      return this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted);
    }
    return (
      <View key={rowID} style={{
        height: 1.0 / PixelRatio.get(),
        backgroundColor: theme.colorAssist,
        marginLeft:5,
        marginRight:5,}} />
    );
  }

  // 渲染底部视图
  _renderFooterView = ()=> {
    if(this.props.renderFooter){
      return this.props.renderFooter();
    }

    if(!this.props.loadMoreEnable){ return null;}
    return <FooterView footerProps={this.props.footerProps}
                       logic={this.listViewLogic}
                       onLoadMore={this._onLoadMore}
                       hasMore={this.props.hasMore}
    />;
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
  },
  footer:{
    flex:1,
    height: 44,
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f4f4f4"
  }
});