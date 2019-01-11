import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../../ui/pages/main/welcomePage.js";
import "../../ui/pages/main/identity-reg.js";
import "../../ui/layouts/body/body.js"
import "../../ui/pages/main/proposal.js";
import "../../ui/pages/main/Registered.js";
import "../../ui/pages/main/Voting.js";
import "../../ui/pages/main/citizenship.js"
import "../../ui/pages/main/newproposal.js";
import "../../ui/pages/main/App-manager/manager.js";
import "../../ui/pages/main/result/result.js";
import "../../ui/pages/main/budgetResult.js";
import "../../ui/pages/main/selected-bgt-prop.js";
import "../../ui/pages/main/Budget.js";
import "../../ui/pages/main/Createbudget.js";
import "../../ui/pages/main/Createbond.js";
import "../../ui/pages/main/Buybond.js";
import "../../ui/pages/main/stvvoting/stvvoting.js"
import "../../ui/pages/main/stvresult/stvresult.js"
import "../../ui/pages/main/stvstatus/stvstatus.js";
import "../../ui/pages/main/business-manager-home/business-manager-home.js";
import "../../ui/pages/main/allbusiness/allbusiness.js";
import "../../ui/pages/main/business/business.js";
import "../../ui/pages/main/exchange/exchange.js";
import "../../ui/pages/main/mybusiness/mybusiness.js";
import "../../ui/pages/main/newbusiness/newbusiness.js";
import "../../ui/pages/main/settings/settings.js";
import "../../ui/pages/main/realestate/realestate.js";
import "../../ui/pages/main/realstate-enquire/enquire.js";
import "../../ui/pages/main/realestate-manage/manage.js";
import "../../ui/pages/main/realestate-bid/bid.js";
import "../../ui/pages/main/Allutopians.js";
import "../../ui/pages/main/lender.js";
import "../../ui/pages/main/realestate-buy/buy.js";
import "../../ui/pages/main/Viewdetails.js";
import "../../ui/pages/main/test/test.js";


FlowRouter.route('/', {
  name: 'welcomePage',
  action() {
    BlazeLayout.render('App_body', { main: 'welcomePage' });
  }
});
FlowRouter.route('/vote/:id', {
  name: 'Vote',
  action() {
    BlazeLayout.render('App_body', { main: 'Vote' });
  }
});
FlowRouter.route('/allutopians', {
  name: 'allutopians',
  action() {
    BlazeLayout.render('App_body', { main: 'allutopians' });
  }
});
FlowRouter.route('/identity-reg', {
  name: 'identity-reg',
  action() {
    BlazeLayout.render('App_body', { main: 'identity_reg'});
  }
});

FlowRouter.route('/reg-success', {
  name: 'Reg-success',
  action() {
    BlazeLayout.render('App_body', { main: 'Reg_success' });
  }
});
FlowRouter.route('/proposal', {
  name: "proposal-page",
  action(){
    BlazeLayout.render('App_body', { main: 'App_proposal'});
  }
});
FlowRouter.route('/citizenship', {
  name: "citizenship",
  action(){
    BlazeLayout.render('App_body', { main: 'citizenship'});
  }
});

FlowRouter.route('/newproposal', {
  name: "newproposal",
  action(){
    BlazeLayout.render('App_body', { main: 'App_newproposal'});
  }
});

FlowRouter.route('/manager', {
  name: "manager",
  action(){
    BlazeLayout.render('App_body', { main: 'App_manager'});    
  }
});

FlowRouter.route('/result/:id', {
  name: "result",
  action(params){
    var cont = params.id
    BlazeLayout.render('App_body', { main: 'App_result', id:cont});
  }
});

FlowRouter.route('/identity', {
  name: "identity",
  action(params){
    var cont = params.id
    BlazeLayout.render('App_body', { main: 'App_identity'});
  }
});

FlowRouter.route('/budget-result', {
  name: "budget_result",
  action(){
    BlazeLayout.render('App_body', { main: 'App_budget_result'});
  }
});


FlowRouter.route('/selected-bgt', {
  name: "selected-bgt",
  action(){
    BlazeLayout.render('App_body', { main: 'App_selected_bgt_prop'});
  }
});
FlowRouter.route('/budget', {
  name: 'Budget',
  action() {
    BlazeLayout.render('App_body', { main: 'budget_app' });
  }
});
FlowRouter.route('/createbudget', {
  name: 'creation',
  action() {
    BlazeLayout.render('App_body', { main: 'Budget_newproposal' });
  }
});


FlowRouter.route('/stvvote', {
  name: 'stvvote',
  action() {
    BlazeLayout.render('App_body', { main: 'App_stvvote' });
  }
});

FlowRouter.route('/stvresult', {
  name: 'stvresult',
  action() {
    BlazeLayout.render('App_body', { main: 'App_stvresult' });
  }
});

FlowRouter.route('/stvstatus', {
  name: 'stvstatus',
  action() {
    BlazeLayout.render('App_body', { main: 'App_stvstatus' });
  }
});

FlowRouter.route('/createbond', {
  name: 'createbond',
  action() {
    BlazeLayout.render('App_body', { main: 'bond' });
  }
});

FlowRouter.route('/buybond', {
  name: 'buybond',
  action() {
    BlazeLayout.render('App_body', { main: 'buybond' });
  }
});

FlowRouter.route('/business', {
  name: 'App_business_manager_home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_business_manager_home' });
  }
});

FlowRouter.route('/business/newbusiness', {
  name: 'App_new_business',
  action() {
      BlazeLayout.render('App_body', { main: 'App_new_business' });
  },
});

FlowRouter.route('/business/mybusiness', {
  name: 'App_my_business',
  action() {
      BlazeLayout.render('App_body', { main: 'App_my_business' });
  },
});

FlowRouter.route('/business/allbusiness', {
  name: 'App_all_business',
  action() {
      BlazeLayout.render('App_body', { main: 'App_all_business' });
  },
});

FlowRouter.route('/business/allbusiness/:id', {
  name: 'App_business',
  action(params) {
      var id = params.id;
      BlazeLayout.render('App_body', { main: 'App_business', id: id });
  }
});

FlowRouter.route('/business/mybusiness/settings/:id', {
  name: 'App_business_settings',
  action(params) {
      var id = params.id;
      BlazeLayout.render('App_body', { main: 'App_business_settings', id: id });
  }
});

FlowRouter.route('/business/exchange', {
  name: 'App_exchange',
  action() {
      BlazeLayout.render('App_body', { main: 'App_exchange' });
  },
});

FlowRouter.route('/realestate', {
  name: 'App_real_estate',
  action() {
      BlazeLayout.render('App_body', { main: 'App_real_estate' });
  },
});

FlowRouter.route('/realestate/:id', {
  name: 'App_realestate_enquire',
  action(params) {
      var id = params.id;
      BlazeLayout.render('App_body', { main: 'App_realestate_enquire', id: id });
  }
});

FlowRouter.route('/lender', {
  name: 'lender',
  action() {
    BlazeLayout.render('App_body', { main: 'lender' });
  }
});

FlowRouter.route('/realestatemanage', {
  name: 'App_real_estate_manager',
  action() {
      BlazeLayout.render('App_body', { main: 'App_real_estate_manager' });
  },
});

FlowRouter.route('/realestatebid', {
  name: 'App_real_estate_bid',
  action() {
      BlazeLayout.render('App_body', { main: 'App_real_estate_bid' });
  },
});

FlowRouter.route('/realestatebuy', {
  name: 'App_real_estate_buy',
  action() {
      BlazeLayout.render('App_body', { main: 'App_real_estate_buy' });
  },
});

FlowRouter.route('/viewdetail', {
  name: 'viewdetail',
  action() {
    BlazeLayout.render('App_body', { main: 'viewdetail' });
  }
});

FlowRouter.route('/test', {
  name: 'App_test',
  action() {
    BlazeLayout.render('App_body', { main: 'App_test' });
  }
});