import "./proposalResult.html";
import "../../stylesheets/proposalResult.css";
import Eos from "eosjs";
import { Session } from 'meteor/session';
import "./footer.js";

eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}

const eos = Eos(eosConfig);

async function getResult(){
    var proposalResultList = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "result13",
        limit: "50",
        json: true,
    });

    Session.set("proposalResultList", proposalResultList.rows);
    console.log("proposal result list ", proposalResultList.rows);
}

Template.App_proposal_result.helpers({
    getProposalResultList: function(){
        getResult();
        console.log("working??? helper",Session.get("proposalResultList"));
        return Session.get("proposalResultList");
    }
});