import {BluzelleClient} from "../../core";
import {BluzelleCoin} from "../../shared/types";
import {QueryAllowanceRequest} from "cosmjs-types/cosmos/feegrant/v1beta1/query";
import {QueryAllowancesRequest} from "../../curium/lib/generated/cosmos/feegrant/v1beta1/query";
import {BasicAllowance, Grant, PeriodicAllowance} from "../../curium/lib/generated/cosmos/feegrant/v1beta1/feegrant";
import {AllowedMsgAllowance} from "cosmjs-types/cosmos/feegrant/v1beta1/feegrant";


type BluzelleAllowance = {
    granter: string,
    grantee: string,
    allowance: {
        typeUrl: string,
        spendLimit: BluzelleCoin[],
        expiration?: Date,
        periodSpendLimit?: BluzelleCoin[],
        periodCanSpend?: BluzelleCoin[],
        periodReset?: Date,
        period?: number,
        allowedMessages?: string[] // For AllowedMsgAllowance
    }
}


const decodeAllowance = (grant: Grant) => {
    if (!grant.allowance) {
        throw new Error("No allowance found in grant");
    }

    const typeUrl = grant.allowance.typeUrl;
    const value = grant.allowance.value;

    if (typeUrl === '/cosmos.feegrant.v1beta1.BasicAllowance') {
        const basicAllowance = BasicAllowance.decode(value);
        return {
            typeUrl,
            spendLimit: basicAllowance.spendLimit?.map(coin => ({
                denom: coin.denom,
                amount: Number(coin.amount)
            })) || [],
            expiration: basicAllowance.expiration || undefined
        };
    } else if (typeUrl === '/cosmos.feegrant.v1beta1.PeriodicAllowance') {
        const periodicAllowance = PeriodicAllowance.decode(value);
        return {
            typeUrl,
            spendLimit: periodicAllowance.basic?.spendLimit?.map(coin => ({
                denom: coin.denom,
                amount: Number(coin.amount)
            })) || [],
            expiration: periodicAllowance.basic?.expiration || undefined,
            periodSpendLimit: periodicAllowance.periodSpendLimit?.map(coin => ({
                denom: coin.denom,
                amount: Number(coin.amount)
            })) || [],
            periodCanSpend: periodicAllowance.periodCanSpend?.map(coin => ({
                denom: coin.denom,
                amount: Number(coin.amount)
            })) || [],
            periodReset: periodicAllowance.periodReset || undefined,
            period: periodicAllowance.period ? Number(periodicAllowance.period.seconds) : undefined
        };
    } else if (typeUrl === '/cosmos.feegrant.v1beta1.AllowedMsgAllowance') {
        const allowedMsgAllowance = AllowedMsgAllowance.decode(value);
        
        // Decode the nested allowance
        let nestedAllowanceData = {
            spendLimit: [] as BluzelleCoin[],
            expiration: undefined as Date | undefined,
            periodSpendLimit: undefined as BluzelleCoin[] | undefined,
            periodCanSpend: undefined as BluzelleCoin[] | undefined,
            periodReset: undefined as Date | undefined,
            period: undefined as number | undefined
        };

        if (allowedMsgAllowance.allowance) {
            const nestedTypeUrl = allowedMsgAllowance.allowance.typeUrl;
            const nestedValue = allowedMsgAllowance.allowance.value;

            if (nestedTypeUrl === '/cosmos.feegrant.v1beta1.BasicAllowance') {
                const basicAllowance = BasicAllowance.decode(nestedValue);
                nestedAllowanceData.spendLimit = basicAllowance.spendLimit?.map(coin => ({
                    denom: coin.denom,
                    amount: Number(coin.amount)
                })) || [];
                nestedAllowanceData.expiration = basicAllowance.expiration || undefined;
            } else if (nestedTypeUrl === '/cosmos.feegrant.v1beta1.PeriodicAllowance') {
                const periodicAllowance = PeriodicAllowance.decode(nestedValue);
                nestedAllowanceData.spendLimit = periodicAllowance.basic?.spendLimit?.map(coin => ({
                    denom: coin.denom,
                    amount: Number(coin.amount)
                })) || [];
                nestedAllowanceData.expiration = periodicAllowance.basic?.expiration || undefined;
                nestedAllowanceData.periodSpendLimit = periodicAllowance.periodSpendLimit?.map(coin => ({
                    denom: coin.denom,
                    amount: Number(coin.amount)
                })) || [];
                nestedAllowanceData.periodCanSpend = periodicAllowance.periodCanSpend?.map(coin => ({
                    denom: coin.denom,
                    amount: Number(coin.amount)
                })) || [];
                nestedAllowanceData.periodReset = periodicAllowance.periodReset || undefined;
                nestedAllowanceData.period = periodicAllowance.period ? Number(periodicAllowance.period.seconds) : undefined;
            }
        }

        return {
            typeUrl,
            ...nestedAllowanceData,
            allowedMessages: allowedMsgAllowance.allowedMessages || []
        };
    } else {
        return {
            typeUrl,
            spendLimit: [],
            expiration: undefined
        };
    }
};

export const getAllowance = (
    client: BluzelleClient,
    granter: string,
    grantee: string,
): Promise<BluzelleAllowance> =>
    client.queryClient.feegrant.Allowance({
        granter,
        grantee
    } as QueryAllowanceRequest)
        .then(res => {
            if (!res.allowance) {
                throw new Error("No allowance found");
            }
            
            return {
                granter: res.allowance.granter,
                grantee: res.allowance.grantee,
                allowance: decodeAllowance(res.allowance)
            };
        });



export const getAllowances = (
    client: BluzelleClient,
    grantee: string,
): Promise<BluzelleAllowance[]> =>
    client.queryClient.feegrant.Allowances({
        grantee
    } as QueryAllowancesRequest)
        .then(res => res.allowances.map(grant => ({
            granter: grant.granter,
            grantee: grant.grantee,
            allowance: decodeAllowance(grant)
        })));



export const getAllowancesByGranter = (
    client: BluzelleClient,
    granter: string,
) =>
    client.queryClient.feegrant.AllowancesByGranter({
        granter
    });