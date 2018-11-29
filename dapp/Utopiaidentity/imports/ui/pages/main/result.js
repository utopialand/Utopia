import "./result.html";
import "../../stylesheets/result.css";
import "./footer.js";
import Eos from "eosjs";



eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo'],
    // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}
const eos = Eos(eosConfig);

<<<<<<< HEAD
Template.App_result.helpers({
    /* calcvote: async function () {
        var result = [];
        var length = 0;
        var id = FlowRouter.current().params.id;
        console.log("id: ", id);
        let resultdata = await eos.getTableRows({
            code: "voteproposal",
            scope: "voteproposal",
            table: "votes13",
            limit: "50",
            json: true,
            key_type: "i64",
            index_position: 2
        });

        let candidatedata = await eos.getTableRows({
            code: "voteproposal",
            scope: "voteproposal",
            table: "proposal11",
            limit: "50",
            json: true,
        });
        console.log("resultdata ", resultdata);
        console.log("candidate data: ", candidatedata);

        //getting the length of list of all choices for a  particular proposal
        var length = 0;
        for (var i = 0; i < resultdata.rows.length; i++) {
            if (id == resultdata.rows[i].proposal_id) {
                length = resultdata.rows[i].choices.length;
                break;
            }
        }

        //creating a 2d array and setting initial votes to 0
        for (var i = 0; i < length; i++) {
            result[i] = [];
        }

        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length; j++) {
                result[i][j] = 0;
            }
        }

        var input = [];
        //creating a 2d array of total votes received 
        for (var i = 0; i < resultdata.rows.length; i++) {
            if (id == resultdata.rows[i].proposal_id) {
                input.push(resultdata.rows[i].choices)
            }
        }
        for(var i=0;i<input.length;i++){
            for(j=0;j<input[i].length;j++){
                var val = input[i][j];
                result[j][val-1] += 1;
            }
        }
    
        console.log("result after calculating ", result);
        return result[0];

    }, */
})

=======
>>>>>>> 8110a9d7c2505204afebc8a071c7d5558c2c6e18
Template.App_result.onRendered(async function () {
    var result = [];
    var length = 0;
    var id = FlowRouter.current().params.id;
    console.log("id: ", id);
    let resultdata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "votes13",
        limit: "50",
        json: true,
        /* key_type: "i64",
        index_position: 2 */
    });

    let candidatedata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "proposal11",
        limit: "50",
        json: true,
    });

    console.log("resultdata ", resultdata);
<<<<<<< HEAD

    //getting the length of list of all choices for a  particular proposal
    var length = 0;
    for (var i = 0; i < resultdata.rows.length; i++) {
        if (id == resultdata.rows[i].proposal_id) {
=======
    console.log("candidate data: ", candidatedata);

    //getting the length of list of all choices for a  particular proposal
    var length = 0;
    for(var i=0; i<resultdata.rows.length;i++){
        if(id == resultdata.rows[i].proposal_id){
>>>>>>> 8110a9d7c2505204afebc8a071c7d5558c2c6e18
            length = resultdata.rows[i].choices.length;
            break;
        }
    }

    //creating a 2d array to store who got how many votes based on rank 
    for (var i = 0; i < length; i++) {
        result[i] = [];
    }

    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
            result[i][j] = 0;
        }
    }

    var input = [];
    //creating a 2d array of total votes received 
<<<<<<< HEAD
    for (var i = 0; i < resultdata.rows.length; i++) {
        if (id == resultdata.rows[i].proposal_id) {
=======
    for(var i=0;i<resultdata.rows.length;i++){
        if(id == resultdata.rows[i].proposal_id){
>>>>>>> 8110a9d7c2505204afebc8a071c7d5558c2c6e18
            input.push(resultdata.rows[i].choices)
        }
    }

<<<<<<< HEAD
    // calculaing votes based on ranks
    //j is the candidate and val-1 is the total votes received for the rank
    for (var i = 0; i < input.length; i++) {
        for (j = 0; j < input[i].length; j++) {
            var val = input[i][j];
            result[j][val - 1] += 1;
        }
    }

    var candidatelist = []
    for(var i=0;i<candidatedata.rows.length;i++){
        if(id == candidatedata.rows[i].id){
            for(var j=0;j<candidatedata.rows[i].proposal_options.length;j++){
                var val = candidatedata.rows[i].proposal_options[j]
                document.getElementById("proposal-result-name").innerHTML += "<br><div class = 'ep'>"+val+"</div>"
    
            }
                        
        }
    }
    console.log("candidatedata", candidatedata);
    console.log("result after calculating ", result);
    
    /* for(var i=0;i<result.length;i++){
        document.getElementById("proposal-result-votes").innerHTML +="<br><div class = 'ep'>"+ result[i].toString().replace(/,/g, '/')+"</div>";
        
    } */


    for(var i=0;i<result.length;i++){
        document.getElementById("proposal-result-votes").innerHTML +="<br><div class = 'ep2'></div>";

        for(var j=0;j<result[i].length;j++){
            var val = result[i][j]
            document.getElementsByClassName("ep2")[i].innerHTML += "<div class = 'vote-stat'>"+val+"</div>"
        }
        
    }
=======

   /*  for (var i = 0; i < resultdata.rows.length; i++) {
        console.log("id: ", id);
        if (resultdata.rows[i].proposal_id == id) {
            var choices = resultdata.rows[i].choices
            for (var j = 0; j < choices.length; j++) {
                var value = choices[j];
                result[j][value - 1] += 1;
            }
        }

    } */
    // calculaing votes based on ranks
    //j is the candidate and val-1 is the total votes received for the rank
    for(var i=0;i<input.length;i++){
        for(j=0;j<input[i].length;j++){
            var val = input[i][j];
            result[j][val-1] += 1;
        }
    }

    console.log("result after calculating ", result);
    /* var candidatelist = candidatedata.rows[id].proposal_options; */

    /* console.log("result of this proposal ", result); */

    /* for (var i = 0; i < result.length; i++) {
        var total = result[i][0];
        total = total + "votes";
        document.getElementsByClassName("candidate")[i].innerHTML = total;
        document.getElementsByTagName("label")[i].innerHTML = candidatelist[i];
    } */
    /* document.getElementById("proposal-result").innerHTML = candidatelist; */
>>>>>>> 8110a9d7c2505204afebc8a071c7d5558c2c6e18
});