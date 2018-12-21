#include "lender.hpp"

ACTION lender::addloancatg(name identity,
                           string desc,
                           float interestrate,
                           int period)

{
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto itr = manager.find(identity.value);
    eosio_assert(itr != manager.end(), "manager not found !!!");

    loancatg_table catg(_self, _self.value);
    catg.emplace(_self, [&](auto &c) {
        c.category_id = catg.available_primary_key();
        c.desc = desc;
        c.interestrate = interestrate;
        c.period = period;
    });
}

ACTION lender::addcollat(name identity,
                         string desc)

{
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto itr = manager.find(identity.value);
    eosio_assert(itr != manager.end(), "manager not found !!");

    collat_tab collat(_self, _self.value);
    collat.emplace(_self, [&](auto &c) {
        c.id = collat.available_primary_key();
        c.type = desc;
    });
}

ACTION lender::reqloancolat(name identity, uint64_t catgid,
                            asset amt,
                            string purpose, vector<uint64_t> prop_id,
                            asset income, uint64_t colatopt)

{
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(identity.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    eosio_assert(itr->citizen, "Not a citizen of Utopia!s!");
    reqloan_tab req(_self, _self.value);

    uint64_t rid;
    idsupp_table idsupp(_self, _self.value);
    idsupp.emplace(_self, [&](auto &c) {
        c.id = idsupp.available_primary_key();
        rid = c.id;
    });

    req.emplace(_self, [&](auto &v) {
        v.reqloanid = rid;
        v.catgid = catgid;
        v.borrower = identity;
        v.loanamt = amt;
        v.purpose = purpose;
        v.colatopt = colatopt;
        v.prop_id = prop_id;
        v.incomepm = income;
        v.status = "requested";
        v.type = true;
    });
}
ACTION lender::approveloan(name identity, uint64_t reqloanid,
                           name borrower)
{
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");

    approveloan_tab approve(_self, _self.value);
    reqloan_tab req(_self, _self.value);
    collat_tab colat(_self, _self.value);
    properties_table prop("realstateutp"_n, "realstateutp"_n.value);
    // businesstb business("utopbusiness"_n, "utopbusiness"_n.value);
    //  credscore_tab credit(_self, _self.value);
    loancatg_table catg(_self, _self.value);

    auto itr = req.find(reqloanid);
    eosio_assert(itr != req.end(), "request not found !!!");
    vector<uint64_t> properties;
    uint64_t colatopt;
    auto type = itr->type;
    colatopt = itr->colatopt;
    auto income = itr->incomepm;
    auto loanamt = itr->loanamt;
    auto catgid = itr->catgid;
    int64_t total = 0;

    if (type == true)
    {
        properties = itr->prop_id;
        auto citr = colat.find(colatopt);
        auto type = citr->type;
        if (type == "Real Estate")
        {
            for (auto j = 0; j < properties.size(); j++)
            {
                auto id = properties[j];
                auto pitr = prop.find(id);
                eosio_assert(pitr != prop.end(), "real-estate id provided by user not found !!!");
                auto price = pitr->price;
                total += price.amount;
            }
        }

        else if (type == "business")
        {
            /* for (auto j = 0; j < properties.size(); j++)
            {
                auto id = properties[j];
                auto bitr = business.find(id);
                eosio_assert(bitr != business.end(), "company id provided by user not found !!!");
                total += 10;
            } */
        }

        auto loanissue = (3 * total) / 4;
        print("total --", total);
        print("issue --", loanissue);
        print("transferring --", loanamt);

        eosio_assert(loanissue >= loanamt.amount, "You are not eligible for the requested loan amount!!");

        print("transferring --", loanamt);
    }
    else
    {
        /*  auto creditr = credit.find(borrower.value);
        auto cscore = creditr->credscore;

        eosio_assert(cscore >= 3, "You are not eligible for lending money!!!");

        auto loanissue = (cscore - 2) * income.amount;

        eosio_assert(loanissue >= loanamt.amount, "You are not eligible for the requested loan amount!!");

        print("transferring --", loanamt); */
    }
    int64_t finaldue;
    auto catitr = catg.find(catgid);
    auto rate = catitr->interestrate;
    auto period = catitr->period;
    finaldue = loanamt.amount + ((loanamt.amount * rate) / 100);

    print("final due---", finaldue);
    print("final due dt---", now() + (period * 86400));
    print("final due asset---", asset(finaldue, symbol(symbol_code("UTP"), 4)));

    approve.emplace(_self, [&](auto &a) {
        a.reqloanid = reqloanid;
        a.borrower = borrower;
        a.approvedAt = now();
        a.amtapproved = loanamt;
        a.totaldue = asset(finaldue, symbol(symbol_code("UTP"), 4));
        a.finalduedt = now() + 600;//(period * 86400);
    });

    req.modify(itr, _self, [&](auto &a) {
        a.status = "request approved";
    });
}

ACTION lender::checkdefault(name identity, uint64_t reqloanid, name borrower)
{
    approveloan_tab approve(_self, _self.value);

    auto itr = approve.find(reqloanid);
    eosio_assert(itr != approve.end(), "requested loan id not found!!!");
    eosio_assert(itr->status != "defaulter", "Already declared as a defaulter!!!");
    if (now() > itr->finalduedt + 86400 * 10 && itr->status == "due")
    {

        print("call modify func of credit score contract---");
        float creditscore = -1;
        bool isdefault = true;
        /* approve.modify(itr, _self, [&](auto &a) {
            a.status = "defaulter";
        }); */
        action(
            permission_level{identity, "active"_n},
            "utpcreditsc1"_n, "modcreditsc"_n,
            std::make_tuple(identity, borrower, creditscore, isdefault))
            .send();
    }

    else
    {
        print("You have time for loan payment--");
    }
}

ACTION lender::checkauction(name identity, uint64_t reqloanid, name borrower)
{
    approveloan_tab approve(_self, _self.value);
    reqloan_tab req(_self, _self.value);
    vector <uint64_t> properties;
    auto itr = approve.find(reqloanid);
    auto reqitr = req.find(reqloanid);
    eosio_assert(itr != approve.end(), "requested loan id not found!!!");
    eosio_assert(reqitr != req.end(), "requested loan id not found!!!");
    properties = reqitr -> prop_id;


    if (now() > (itr->finalduedt + 86400 * 10) + 50 && itr->status == "defaulter")
    {

        print("call auction func of real estate contract---");
        
        approve.modify(itr, _self, [&](auto &a) {
            a.status = "auction called";
        });
        action(
            permission_level{identity, "active"_n},
            "realstateutp"_n, "auction"_n,
            std::make_tuple(properties[0],identity, now()+(5*86400),(now()+(5*86400))+(5*86400)))
            .send();
    }

    else
    {
        print("You have time for loan payment--");
    }
}

ACTION lender::loanpayment(name payer, uint64_t reqloanid, asset amt)
{
    require_auth(payer);
    reqloan_tab req(_self, _self.value);
    approveloan_tab approve(_self, _self.value);
    paymentdet_tab payment(_self, _self.value);
    auto itr = req.find(reqloanid);
    auto appritr = approve.find(reqloanid);
    eosio_assert(itr != req.end(), "requested loan id not found!!!");
    eosio_assert(appritr != approve.end(), "requested loan id was not approved!!!");

    payment.emplace(payer, [&](auto &p) {
        p.reqloanid = reqloanid;
        p.payer = payer;
        p.amount = amt;
        p.paymentAt = now();
    });
}

ACTION lender::paymentacpt(name identity, uint64_t reqloanid)
{
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");

    reqloan_tab req(_self, _self.value);
    approveloan_tab approve(_self, _self.value);
    paymentdet_tab payment(_self, _self.value);

    auto itr = payment.find(reqloanid);
    auto appritr = approve.find(reqloanid);
    auto reqitr = req.find(reqloanid);
    eosio_assert(itr != payment.end(), "Payment from loan id not found!!!");
    auto dueamt = appritr->totaldue;
    auto paymentAt = itr->paymentAt;
    auto amt = itr->amount;
    auto borrower = itr->payer;
    float creditscore;
    bool isdefault;
    string statusApprove;
    string status;
    asset left;

    if (amt < dueamt)
    {
        left = dueamt - amt;
        status = "due";
    }
    else if (amt == dueamt)
    {
        left = dueamt - amt;
        status = "complete";

        if (paymentAt > appritr->finalduedt)
        {
            if (paymentAt > appritr->finalduedt + 86400 * 10)
            {
                creditscore = -1;
                isdefault = true;
                status = "complete, defaulter";
            }
            else
            {
                creditscore = -.5;
                isdefault = false;
            }
        }

        else
        {
            creditscore = .1;
            isdefault = false;
        }

        ///////////////////////////////////////////
        print("call modify function in credit score contract--");

        action(
            permission_level{identity, "active"_n},
            "utpcreditsc1"_n, "modcreditsc"_n,
            std::make_tuple(identity, borrower, creditscore, isdefault))
            .send();
        //////////////////////////////////////////

        req.modify(reqitr, _self, [&](auto &a) {
            a.status = "loan payment complete";
        });
    }
    else
    {
        print("excess amt--");
    }

    approve.modify(appritr, _self, [&](auto &a) {
        a.totaldue = left;
        a.status = status;
    });

    payment.erase(itr);
}

/* 
 */
/*ACTION lender::addupdatecr(name identity, uint16_t crscore)
{
    credscore_tab credit(_self, _self.value);
    credit.emplace(_self, [&](auto &c) {
        c.borrower = identity;
        c.credscore = crscore;
    });
}



ACTION lender::reqloanincm(name identity, uint64_t catgid,
                           asset amt,
                           string purpose,
                           asset income)

{
    identity_table iden_table("identityreg1"_n, "identityreg1"_n.value);
    auto itr = iden_table.find(identity.value);
    eosio_assert(itr != iden_table.end(), "identity not found !!!");
    eosio_assert(itr->citizen, "Not a citizen of Utopia !!!");
    reqloan_tab req(_self, _self.value);

    uint64_t rid;
    idsupp_table idsupp(_self, _self.value);
    idsupp.emplace(_self, [&](auto &c) {
        c.id = idsupp.available_primary_key();
        rid = c.id;
    });

    req.emplace(_self, [&](auto &v) {
        v.reqloanid = rid;
        v.catgid = catgid;
        v.borrower = identity;
        v.loanamt = amt;
        v.purpose = purpose;
        v.incomepm = income;
        v.type = false;
    });
}






*/

ACTION lender::hi()
{
    print("transfer-----=");
}

//EOSIO_DISPATCH(lender, (addloancatg)(addcatg)(hi)(addupdatecr)(reqloancolat)(reqloanincm)(approveloan)(loanpayment)(checkdefault))

EOSIO_DISPATCH(lender, (hi)(addloancatg)(addcollat)(reqloancolat)(approveloan)(checkdefault)(loanpayment)(paymentacpt))