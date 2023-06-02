import { BluzelleClient } from '../../core';
import { ModuleVersion, Plan } from '../../curium/lib/generated/cosmos/upgrade/v1beta1/upgrade';


type BluzellePlan = {
  name: string;
  height: number;
  info: string;
}

type BluzelleModuleVersion = {
  name: string;
  version: string
}

export const getCurrentPlan = (
  client: BluzelleClient,
): Promise<BluzellePlan> =>
  client.queryClient.upgrade.CurrentPlan({})
    .then(res => parsePlan(res.plan));


export const getAppliedPlan = (
  client: BluzelleClient,
  name: string
) =>
  client.queryClient.upgrade.AppliedPlan({
    name,
  })
    .then(res => ({
      height: res.height.toNumber()
    }));


export const getModuleVersions = (
  client: BluzelleClient,
  moduleName: string
): Promise<BluzelleModuleVersion[]> =>
  client.queryClient.upgrade.ModuleVersions({
    moduleName
  })
    .then(res => res.moduleVersions.map(parseModuleVersion));


const parsePlan = (plan?: Plan): BluzellePlan => plan ? {
  name: plan.name,
  height: plan.height.toNumber(),
  info: plan.info,
}: {
  name: "",
  height: -1,
  info: "",
};

const parseModuleVersion = (moduleVersion: ModuleVersion): BluzelleModuleVersion => ({
  name: moduleVersion.name,
  version: moduleVersion.version.toString(),
});
