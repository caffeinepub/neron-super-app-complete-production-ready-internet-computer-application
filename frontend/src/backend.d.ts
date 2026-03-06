import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VerifierValidation {
    verifierPrincipal: Principal;
    validationResult: boolean;
    validationTimestamp: bigint;
    validationSignature: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface MiningWorker {
    id: string;
    status: string;
    bondToken: string;
    cryptographicIdentity: string;
    owner: Principal;
    hardwareSpecs: string;
    registeredAt: bigint;
    verificationStatus: string;
    bondAmount: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface MiningProof {
    workerId: string;
    rewardAmount: number;
    cwuAmount: number;
    owner: Principal;
    computationHash: string;
    rewardStatus: string;
    timestamp: bigint;
    cryptographicSignature: string;
    verifierConsensus: Array<VerifierValidation>;
    verificationStatus: string;
    proofId: string;
}
export interface DecentralizationMetrics {
    verifiedProofs: bigint;
    totalWorkers: bigint;
    lastUpdated: bigint;
    activeWorkers: bigint;
    decentralizationScore: number;
    totalProofs: bigint;
    averageVerifiers: number;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface MiningAuditEntry {
    action: string;
    entryId: string;
    timestamp: bigint;
    details: string;
    actorPrincipal: Principal;
    proofId: string;
}
export interface FileReference {
    hash: string;
    path: string;
}
export interface UserProfile {
    votingAbility: boolean;
    principal: Principal;
    completedRevolutionaryUpgrades: boolean;
    privacyTips: Array<string>;
    completedWelcome: boolean;
    name: string;
    onboardingProgress: bigint;
    onboardingCompleted: boolean;
    completedDocumentation: boolean;
    completedWhitepaper: boolean;
    completedGetStarted: boolean;
    sessionStatus: string;
    completedTutorial: boolean;
}
export interface http_header {
    value: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deactivateMiningWorker(workerId: string): Promise<void>;
    distributeMiningReward(proofId: string, rewardAmount: number): Promise<void>;
    dropFileReference(path: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDecentralizationMetrics(): Promise<DecentralizationMetrics>;
    getFileReference(path: string): Promise<FileReference>;
    getMiningAuditLog(): Promise<Array<MiningAuditEntry>>;
    getMiningProof(proofId: string): Promise<MiningProof | null>;
    getMiningWorker(workerId: string): Promise<MiningWorker | null>;
    getMyMiningAuditEntries(): Promise<Array<MiningAuditEntry>>;
    getNeronFirstPost(): Promise<string>;
    getOnboardingProgress(): Promise<bigint>;
    getPrincipalInfo(): Promise<Principal>;
    getPrivacyTips(): Promise<Array<string>>;
    getSessionStatus(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVotingAbilityStatus(): Promise<boolean>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isOnboardingCompleted(): Promise<boolean>;
    listFileReferences(): Promise<Array<FileReference>>;
    listMyMiningProofs(): Promise<Array<MiningProof>>;
    listMyMiningWorkers(): Promise<Array<MiningWorker>>;
    markDocumentationCompleted(completed: boolean): Promise<void>;
    markGetStartedCompleted(completed: boolean): Promise<void>;
    markRevolutionaryUpgradesCompleted(completed: boolean): Promise<void>;
    markTutorialCompleted(completed: boolean): Promise<void>;
    markWelcomeCompleted(completed: boolean): Promise<void>;
    markWhitepaperCompleted(completed: boolean): Promise<void>;
    registerFileReference(path: string, hash: string): Promise<void>;
    registerMiningWorker(cryptographicIdentity: string, hardwareSpecs: string, bondAmount: bigint, bondToken: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitMiningProof(workerId: string, computationHash: string, cryptographicSignature: string, cwuAmount: number): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateDisplayName(newName: string): Promise<void>;
    updateOnboardingProgress(progress: bigint, completed: boolean): Promise<void>;
    updateSessionStatus(status: string): Promise<void>;
    updateVotingAbilityStatus(status: boolean): Promise<void>;
    verifyMiningProof(proofId: string, validationResult: boolean, validationSignature: string): Promise<void>;
}
