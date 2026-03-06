import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type BondType = { 'icp' : null } |
  { 'nrn' : null };
export interface FileReference { 'hash' : string, 'path' : string }
export interface GovernanceLock {
  'id' : string,
  'status' : string,
  'unlockTimestamp' : bigint,
  'locker' : Principal,
  'lockTimestamp' : bigint,
  'proposalId' : string,
  'lockedAmount' : bigint,
}
export type GovernancePhase = { 'locking' : null } |
  { 'voting' : null } |
  { 'proposalSubmission' : null };
export interface GovernanceProposal {
  'id' : string,
  'status' : string,
  'title' : string,
  'creator' : Principal,
  'createdAt' : bigint,
  'feePaid' : bigint,
  'description' : string,
  'updatedAt' : bigint,
  'phase' : GovernancePhase,
}
export interface GovernanceVote {
  'id' : string,
  'status' : string,
  'voter' : Principal,
  'vote' : boolean,
  'timestamp' : bigint,
  'proposalId' : string,
}
export interface GuideAchievement {
  'id' : string,
  'status' : string,
  'user' : Principal,
  'achievedAt' : bigint,
  'achievement' : string,
}
export interface GuideHighlight {
  'id' : string,
  'status' : string,
  'stepId' : string,
  'highlightType' : string,
  'createdAt' : bigint,
  'updatedAt' : bigint,
  'selector' : string,
}
export interface GuideNavigation {
  'id' : string,
  'status' : string,
  'stepId' : string,
  'previous' : [] | [string],
  'exit' : boolean,
  'createdAt' : bigint,
  'skip' : boolean,
  'updatedAt' : bigint,
  'nextStep' : [] | [string],
}
export interface GuidePreference {
  'id' : string,
  'status' : string,
  'theme' : string,
  'createdAt' : bigint,
  'user' : Principal,
  'updatedAt' : bigint,
  'detailLevel' : bigint,
  'tutorialSpeed' : bigint,
}
export interface GuideProgress {
  'id' : string,
  'status' : string,
  'skippedSteps' : Array<string>,
  'startedAt' : bigint,
  'user' : Principal,
  'updatedAt' : bigint,
  'currentStep' : string,
  'completedSteps' : Array<string>,
}
export interface GuideSection {
  'id' : string,
  'status' : string,
  'title' : string,
  'order' : bigint,
  'createdAt' : bigint,
  'description' : string,
  'updatedAt' : bigint,
  'steps' : Array<string>,
}
export interface GuideStatus {
  'id' : string,
  'status' : string,
  'skippedSteps' : Array<string>,
  'startedAt' : bigint,
  'user' : Principal,
  'updatedAt' : bigint,
  'currentStep' : string,
  'completedSteps' : Array<string>,
}
export interface GuideStep {
  'id' : string,
  'status' : { 'active' : boolean, 'skipped' : boolean, 'completed' : boolean },
  'title' : string,
  'order' : bigint,
  'createdAt' : bigint,
  'navigation' : {
    'previous' : [] | [string],
    'exit' : boolean,
    'next' : [] | [string],
    'skip' : boolean,
  },
  'section' : string,
  'description' : string,
  'highlightSelector' : string,
  'version' : bigint,
  'updatedAt' : bigint,
  'progress' : { 'currentStep' : bigint, 'totalSteps' : bigint },
  'mobile' : { 'optimized' : boolean, 'responsive' : boolean },
  'visual' : {
    'arrow' : boolean,
    'animation' : boolean,
    'border' : boolean,
    'tooltip' : boolean,
    'spotlight' : boolean,
  },
  'accessibility' : {
    'contrast' : boolean,
    'keyboardNavigation' : boolean,
    'screenReader' : boolean,
  },
}
export interface GuideTooltip {
  'id' : string,
  'status' : string,
  'stepId' : string,
  'content' : string,
  'createdAt' : bigint,
  'updatedAt' : bigint,
  'position' : string,
}
export interface GuideVersion {
  'id' : string,
  'status' : string,
  'createdAt' : bigint,
  'version' : bigint,
  'updatedAt' : bigint,
}
export interface NeumannPeriod {
  'id' : string,
  'status' : string,
  'name' : string,
  'nrnAllocation' : bigint,
  'endTimestamp' : bigint,
  'startTimestamp' : bigint,
  'cwuTarget' : bigint,
}
export interface PoccCwuStats {
  'id' : string,
  'totalCwu' : number,
  'timestamp' : bigint,
  'periodId' : string,
  'workerCount' : bigint,
}
export interface PoccEpoch {
  'id' : string,
  'status' : string,
  'endTimestamp' : bigint,
  'periodId' : string,
  'startTimestamp' : bigint,
}
export interface PoccPool {
  'id' : string,
  'status' : string,
  'creator' : Principal,
  'totalBonded' : bigint,
  'name' : string,
  'createdAt' : bigint,
  'effectiveShareCap' : number,
}
export interface PoccProof {
  'id' : string,
  'cwu' : number,
  'status' : string,
  'workerId' : string,
  'proofData' : string,
  'taskId' : string,
  'timestamp' : bigint,
}
export interface PoccReward {
  'id' : string,
  'cwu' : number,
  'status' : string,
  'workerId' : string,
  'nrnReward' : bigint,
  'timestamp' : bigint,
  'periodId' : string,
}
export interface PoccSlashing {
  'id' : string,
  'status' : string,
  'workerId' : string,
  'penaltyAmount' : bigint,
  'timestamp' : bigint,
  'reason' : string,
}
export interface PoccTask {
  'id' : string,
  'status' : string,
  'difficulty' : bigint,
  'createdAt' : bigint,
  'seed' : string,
  'payload' : string,
}
export interface PoccWorker {
  'id' : string,
  'status' : string,
  'principal' : Principal,
  'reputationScore' : number,
  'hardwareAttestation' : string,
  'registrationTimestamp' : bigint,
  'bondType' : BondType,
  'bondAmount' : bigint,
}
export interface UserProfile { 'name' : string }
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface _SERVICE {
  'addGuideAchievement' : ActorMethod<[string], string>,
  'addGuideHighlight' : ActorMethod<[GuideHighlight], undefined>,
  'addGuideNavigation' : ActorMethod<[GuideNavigation], undefined>,
  'addGuideSection' : ActorMethod<[GuideSection], undefined>,
  'addGuideStep' : ActorMethod<[GuideStep], undefined>,
  'addGuideTooltip' : ActorMethod<[GuideTooltip], undefined>,
  'addGuideVersion' : ActorMethod<[bigint], string>,
  'addNeumannPeriod' : ActorMethod<[NeumannPeriod], undefined>,
  'addPoccCwuStats' : ActorMethod<[string, number, bigint], string>,
  'addPoccEpoch' : ActorMethod<[string, bigint, bigint], string>,
  'addPoccSlashing' : ActorMethod<[string, string, bigint], string>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'castGovernanceVote' : ActorMethod<[string, boolean], string>,
  'createGovernanceProposal' : ActorMethod<[string, string, bigint], string>,
  'createPoccPool' : ActorMethod<[string, bigint, number], string>,
  'createPoccTask' : ActorMethod<[string, bigint, string], string>,
  'distributePoccReward' : ActorMethod<
    [string, string, number, bigint],
    string
  >,
  'dropFileReference' : ActorMethod<[string], undefined>,
  'getCallerUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getCreatorNernSupply' : ActorMethod<[], bigint>,
  'getCurrentNeumannPeriod' : ActorMethod<[], [] | [NeumannPeriod]>,
  'getDocumentationContent' : ActorMethod<[], string>,
  'getDocumentationSections' : ActorMethod<[], Array<[string, string]>>,
  'getFileReference' : ActorMethod<[string], FileReference>,
  'getGovernanceLock' : ActorMethod<[string], [] | [GovernanceLock]>,
  'getGovernanceLockingInstructions' : ActorMethod<[], string>,
  'getGovernancePenaltyInstructions' : ActorMethod<[], string>,
  'getGovernancePhaseDurations' : ActorMethod<[], [bigint, bigint, bigint]>,
  'getGovernancePhaseStatus' : ActorMethod<[], string>,
  'getGovernanceProofOfAttendanceInstructions' : ActorMethod<[], string>,
  'getGovernanceProposal' : ActorMethod<[string], [] | [GovernanceProposal]>,
  'getGovernanceProposalStats' : ActorMethod<[string], [bigint, bigint]>,
  'getGovernanceSystemOverview' : ActorMethod<[], string>,
  'getGovernanceSystemStatus' : ActorMethod<[], string>,
  'getGovernanceVote' : ActorMethod<[string], [] | [GovernanceVote]>,
  'getGovernanceVotingInstructions' : ActorMethod<[], string>,
  'getGuideAchievement' : ActorMethod<[string], [] | [GuideAchievement]>,
  'getGuideHighlight' : ActorMethod<[string], [] | [GuideHighlight]>,
  'getGuideNavigation' : ActorMethod<[string], [] | [GuideNavigation]>,
  'getGuidePreference' : ActorMethod<[string], [] | [GuidePreference]>,
  'getGuideProgress' : ActorMethod<[string], [] | [GuideProgress]>,
  'getGuideSection' : ActorMethod<[string], [] | [GuideSection]>,
  'getGuideStatus' : ActorMethod<[string], [] | [GuideStatus]>,
  'getGuideStep' : ActorMethod<[string], [] | [GuideStep]>,
  'getGuideTooltip' : ActorMethod<[string], [] | [GuideTooltip]>,
  'getGuideVersion' : ActorMethod<[string], [] | [GuideVersion]>,
  'getLockedNernStats' : ActorMethod<[string], bigint>,
  'getLockedNernStatus' : ActorMethod<[string], bigint>,
  'getMineableNernSupply' : ActorMethod<[], bigint>,
  'getNeumannPeriod' : ActorMethod<[string], [] | [NeumannPeriod]>,
  'getNeumannPeriodBreakdown' : ActorMethod<[], Array<[string, bigint]>>,
  'getPoccCwuFormula' : ActorMethod<[], string>,
  'getPoccCwuStats' : ActorMethod<[string], [] | [PoccCwuStats]>,
  'getPoccEpoch' : ActorMethod<[string], [] | [PoccEpoch]>,
  'getPoccEpochDuration' : ActorMethod<[], bigint>,
  'getPoccMinimumBond' : ActorMethod<[], bigint>,
  'getPoccNeumannPeriods' : ActorMethod<[], Array<[string, bigint, bigint]>>,
  'getPoccPool' : ActorMethod<[string], [] | [PoccPool]>,
  'getPoccProof' : ActorMethod<[string], [] | [PoccProof]>,
  'getPoccReward' : ActorMethod<[string], [] | [PoccReward]>,
  'getPoccRewardFormula' : ActorMethod<[], string>,
  'getPoccSlashing' : ActorMethod<[string], [] | [PoccSlashing]>,
  'getPoccTask' : ActorMethod<[string], [] | [PoccTask]>,
  'getPoccWorker' : ActorMethod<[string], [] | [PoccWorker]>,
  'getTotalNernSupply' : ActorMethod<[], bigint>,
  'getUnlockInstructions' : ActorMethod<[], string>,
  'getUnlockStatus' : ActorMethod<[], string>,
  'getUnlockSystemStatus' : ActorMethod<[], string>,
  'getUnlockableNernInstructions' : ActorMethod<[], string>,
  'getUnlockableNernLocks' : ActorMethod<[], Array<GovernanceLock>>,
  'getUnlockableNernStats' : ActorMethod<[], [bigint, bigint]>,
  'getUnlockableNernStatus' : ActorMethod<[], string>,
  'getUnlockableNernSystemStatus' : ActorMethod<[], string>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'getWhitepaperContent' : ActorMethod<[], string>,
  'initializeAccessControl' : ActorMethod<[], undefined>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'listFileReferences' : ActorMethod<[], Array<FileReference>>,
  'listGovernanceProposals' : ActorMethod<[], Array<GovernanceProposal>>,
  'listGuideHighlights' : ActorMethod<[], Array<GuideHighlight>>,
  'listGuideNavigation' : ActorMethod<[], Array<GuideNavigation>>,
  'listGuideSections' : ActorMethod<[], Array<GuideSection>>,
  'listGuideSteps' : ActorMethod<[], Array<GuideStep>>,
  'listGuideTooltips' : ActorMethod<[], Array<GuideTooltip>>,
  'listGuideVersions' : ActorMethod<[], Array<GuideVersion>>,
  'listMyGovernanceLocks' : ActorMethod<[], Array<GovernanceLock>>,
  'listMyGovernanceVotes' : ActorMethod<[], Array<GovernanceVote>>,
  'listMyGuideAchievements' : ActorMethod<[], Array<GuideAchievement>>,
  'listMyGuidePreferences' : ActorMethod<[], Array<GuidePreference>>,
  'listMyGuideProgress' : ActorMethod<[], Array<GuideProgress>>,
  'listMyGuideStatus' : ActorMethod<[], Array<GuideStatus>>,
  'listNeumannPeriods' : ActorMethod<[], Array<NeumannPeriod>>,
  'listPoccCwuStats' : ActorMethod<[], Array<PoccCwuStats>>,
  'listPoccEpochs' : ActorMethod<[], Array<PoccEpoch>>,
  'listPoccPools' : ActorMethod<[], Array<PoccPool>>,
  'listPoccProofs' : ActorMethod<[], Array<PoccProof>>,
  'listPoccRewards' : ActorMethod<[], Array<PoccReward>>,
  'listPoccSlashings' : ActorMethod<[], Array<PoccSlashing>>,
  'listPoccTasks' : ActorMethod<[], Array<PoccTask>>,
  'listPoccWorkers' : ActorMethod<[], Array<PoccWorker>>,
  'lockNernForGovernance' : ActorMethod<[string, bigint], string>,
  'lockNernForProofOfAttendance' : ActorMethod<[bigint], string>,
  'registerFileReference' : ActorMethod<[string, string], undefined>,
  'registerPoccWorker' : ActorMethod<[BondType, bigint, string], string>,
  'saveCallerUserProfile' : ActorMethod<[UserProfile], undefined>,
  'setGuidePreference' : ActorMethod<[bigint, bigint, string], string>,
  'startGuideProgress' : ActorMethod<[string], string>,
  'startGuideStatus' : ActorMethod<[string], string>,
  'submitPoccProof' : ActorMethod<[string, string, string, number], string>,
  'unlockNern' : ActorMethod<[string], undefined>,
  'updateGuidePreference' : ActorMethod<
    [string, bigint, bigint, string],
    undefined
  >,
  'updateGuideProgress' : ActorMethod<
    [string, string, Array<string>, Array<string>, string],
    undefined
  >,
  'updateGuideStatus' : ActorMethod<
    [string, string, Array<string>, Array<string>, string],
    undefined
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
