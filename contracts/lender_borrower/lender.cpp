#include "lender.hpp"

ACTION lender::addloancatg(name identity, uint64_t category_id,
                           string desc,
                           uint8_t interestrate,
                           uint8_t period)

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

ACTION lender::addupdatecr(name identity, uint16_t crscore)
{
    credscore_tab credit(_self, _self.value);
    credit.emplace(_self, [&](auto &c) {
        c.borrower = identity;
        c.credscore = crscore;
    });
}

ACTION lender::reqloancolat(name identity, uint64_t catgid,
                            asset amt,
                            string purpose, vector<vector<uint64_t>> prop_id,
                            asset income, vector<uint64_t> colatopt)

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
        v.colatopt = colatopt;
        v.prop_id = prop_id;
        v.incomepm = income;
        v.type = true;
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

ACTION lender::approveloan(name identity, uint64_t reqloanid,
                           name borrower,
                           uint64_t approvedAt,
                           asset totaldue,
                           uint64_t finalduedt)
{
    require_auth(identity);
    manager_table manager("utpmanager11"_n, "utpmanager11"_n.value);
    auto mitr = manager.find(identity.value);
    eosio_assert(mitr != manager.end(), "manager not found !!!");

    approveloan_tab approve(_self, _self.value);
    reqloan_tab req(_self, _self.value);
    collat_tab colat(_self, _self.value);
    properties_table prop("realstateutp"_n, "realstateutp"_n.value);
    businesstb business("utopbusiness"_n, "utopbusiness"_n.value);
    credscore_tab credit(_self, _self.value);
    loancatg_table catg(_self, _self.value);

    auto itr = req.find(reqloanid);
    eosio_assert(itr != req.end(), "request not found !!!");
    vector<vector<uint64_t>> properties;
    vector<uint64_t> colatopt;
    auto type = itr->type;
    colatopt = itr->colatopt;
    auto income = itr->incomepm;
    auto loanamt = itr->loanamt;
    auto catgid = itr->catgid;
    int64_t total;

    if (type == true)
    {
        properties = itr->prop_id;
        for (auto i = 0; i < colatopt.size(); i++)
        {
            auto citr = colat.find(colatopt[i]);
            auto type = citr->type;
            if (type == "real-estate")
            {
                for (auto j = 0; j < properties[i].size(); j++)
                {
                    auto id = properties[i][j];
                    auto pitr = prop.find(id);
                    eosio_assert(pitr != prop.end(), "real-estate id provided by user not found !!!");
                    auto price = pitr->price;
                    total += price.amount;
                }
            }

            else if (type == "business")
            {
                for (auto j = 0; j < properties[i].size(); j++)
                {
                    auto id = properties[i][j];
                    auto bitr = business.find(id);
                    eosio_assert(bitr != business.end(), "company id provided by user not found !!!");
                    total += 10;
                }
            }
        }

        auto loanissue = (3 * total) / 4;

        eosio_assert(loanissue >= loanamt.amount, "You are not eligible for the requested loan amount!!");

        print("transferring --", loanamt);
    }
    else
    {
        auto creditr = credit.find(borrower.value);
        auto cscore = creditr->credscore;

        eosio_assert(cscore >= 3, "You are not eligible for lending money!!!");

        auto loanissue = (cscore - 2) * income.amount;

        eosio_assert(loanissue >= loanamt.amount, "You are not eligible for the requested loan amount!!");

        print("transferring --", loanamt);
    }
    asset finaldue;
    auto catitr = catg.find(catgid);
    auto rate = catitr->interestrate;
    auto period = catitr->period;
    finaldue.amount = loanamt.amount + ((loanamt.amount * rate) / 100);

    approve.emplace(_self, [&](auto &a) {
        a.reqloanid = reqloanid;
        a.borrower = borrower;
        a.approvedAt = now();
        a.amtapproved = loanamt;
        a.totaldue = finaldue;
        a.finalduedt = now() + (period * 86400);
    });
}

ACTION lender::loanpayment(name borrower, uint64_t reqloanid, asset amt)
{
    reqloan_tab req(_self, _self.value);
    approveloan_tab approve(_self, _self.value);
    auto itr = req.find(reqloanid);
    auto appritr = approve.find(reqloanid);
    eosio_assert(itr != req.end(), "requested loan id not found!!!");
    auto dueamt = appritr->totaldue;
    auto paymentAt = now();
    string status;
    asset left;
    if (paymentAt > appritr->finalduedt)
        auto creditscore = -.5;
    else
        auto creditscore = .1;
    print("call modify function in credit score contract--");
    if (amt < dueamt)
    {
        print("transfer---", amt);
        left = dueamt - amt;
        status = "due";
    }
    else if (amt == dueamt)
    {
        print("transfer---", amt);
        left.amount = 0;
        status = "complete";
    }
    else
    {
        print("transfer---", dueamt - amt);
        left.amount = 0;
        status = "complete";
    }

    approve.modify(appritr, _self, [&](auto &a) {
        a.totaldue = left;
        a.status = status;
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
        auto creditscore = -1;
        auto isdefault = true;
        print("call modify func of credit score contract---");
        approve.modify(itr, _self, [&](auto &a) {
            a.status = "defaulter";
        });
    }
}

EOSIO_DISPATCH(lender, (addloancatg)(addupdatecr)(reqloancolat)(reqloanincm)(approveloan)(loanpayment)(checkdefault))