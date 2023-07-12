import { Plan, SoftwareUpgradeProposal } from '../../curium/lib/generated/cosmos/upgrade/v1beta1/upgrade';
import { parseNumToLong } from '../../shared/parse';

export const encodeSoftwareUpgradeProposal = (params: {
  title: string;
  description: string;
  plan?: {
    name: string,
    height: number,
    info: string,
  }
}): Uint8Array => SoftwareUpgradeProposal.encode({
  title: params.title,
  description: params.description,
  plan: params.plan ? {
    name: params.plan.name,
    height: parseNumToLong(params.plan.height),
    info: params.plan.info,
  } as Plan : undefined,
}).finish();
