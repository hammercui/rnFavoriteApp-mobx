/**
 * Created by Gaohan on 2017/5/25.
 */
import { observable, computed, observe, autorunAsync, autorun, reaction } from 'mobx';
import UserInfoForm from './userInfo';

class SingletonStore {
  @observable userInfo = null;
  @observable userDetail = "";


  constructor() {
    this.userInfo = new UserInfoForm();

    // observe(this.userInfo, 'userName', (change) => {
    //   console.log("change:", change);
    //   if (change.type = 'update') {
    //     this.userDetail = change.newValue;
    //   }
    // });

    // autorun(()=> {
    //   // this.change(this.userInfo.userName);
    //   this.userDetail = this.userInfo.userName;
    // });

    this.init();
  }


  init() {
    // observe(this.userInfo, 'userName', (change) => {
    //   console.log("change:", change);
    //   if (change.type = 'update') {
    //     this.userDetail = change.newValue;
    //   }
    // });

    // autorun(()=> {
    //   // this.change(this.userInfo.userName);
    //   this.userDetail = this.userInfo.userName;
    // });

    // reaction(
    //   () => this.userInfo.userName,
    //   userName =>  this.userDetail =userName
    // );

    autorunAsync(()=> {
      this.change(this.userInfo.userName);
    }, 1000)

  }

  change(userName) {
    console.log(userName);
    this.userDetail = userName;
  }


}

singleton = new SingletonStore();
export default singleton;


// const user = observable(new UserInfoForm());
//
// export {
//   user,
// }