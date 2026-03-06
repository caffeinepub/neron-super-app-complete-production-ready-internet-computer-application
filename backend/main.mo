import AccessControl "authorization/access-control";
import Registry "blob-storage/registry";
import Principal "mo:base/Principal";
import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Float "mo:base/Float";
import OutCall "http-outcalls/outcall";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  let registry = Registry.new();

  // ============================================================================
  // Helper Functions
  // ============================================================================

  private func isAnonymous(caller : Principal) : Bool {
    Principal.isAnonymous(caller);
  };

  private func ensureAuthenticated(caller : Principal) {
    if (isAnonymous(caller)) {
      Debug.trap("Unauthorized: Anonymous principals cannot perform this action");
    };
  };

  // Analytics Transformer Function
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ============================================================================
  // ACCESS CONTROL FUNCTIONS
  // ============================================================================

  public shared ({ caller }) func initializeAccessControl() : async () {
    ensureAuthenticated(caller);
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    ensureAuthenticated(caller);
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    ensureAuthenticated(caller);
    // Admin-only check happens inside assignRole
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    ensureAuthenticated(caller);
    AccessControl.isAdmin(accessControlState, caller);
  };

  // ============================================================================
  // FILE REGISTRY FUNCTIONS (User-level access)
  // ============================================================================

  public shared ({ caller }) func registerFileReference(path : Text, hash : Text) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can register file references");
    };
    Registry.add(registry, path, hash);
  };

  public query ({ caller }) func getFileReference(path : Text) : async Registry.FileReference {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can get file references");
    };
    Registry.get(registry, path);
  };

  public query ({ caller }) func listFileReferences() : async [Registry.FileReference] {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can list file references");
    };
    Registry.list(registry);
  };

  public shared ({ caller }) func dropFileReference(path : Text) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can drop file references");
    };
    Registry.remove(registry, path);
  };

  // ============================================================================
  // USER PROFILE MANAGEMENT
  // ============================================================================

  public type UserProfile = {
    name : Text;
    votingAbility : Bool;
    principal : Principal;
    sessionStatus : Text;
    privacyTips : [Text];
    completedWelcome : Bool;
    completedRevolutionaryUpgrades : Bool;
    completedGetStarted : Bool;
    completedDocumentation : Bool;
    completedWhitepaper : Bool;
    completedTutorial : Bool;
    onboardingProgress : Nat;
    onboardingCompleted : Bool;
  };

  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);
  var userProfiles = principalMap.empty<UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    // Users can view their own profile, admins can view any profile
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    // Ensure the principal in the profile matches the caller
    let validatedProfile : UserProfile = {
      name = profile.name;
      votingAbility = profile.votingAbility;
      principal = caller; // Always set to caller to prevent spoofing
      sessionStatus = profile.sessionStatus;
      privacyTips = profile.privacyTips;
      completedWelcome = profile.completedWelcome;
      completedRevolutionaryUpgrades = profile.completedRevolutionaryUpgrades;
      completedGetStarted = profile.completedGetStarted;
      completedDocumentation = profile.completedDocumentation;
      completedWhitepaper = profile.completedWhitepaper;
      completedTutorial = profile.completedTutorial;
      onboardingProgress = profile.onboardingProgress;
      onboardingCompleted = profile.onboardingCompleted;
    };
    userProfiles := principalMap.put(userProfiles, caller, validatedProfile);
  };

  public shared ({ caller }) func updateDisplayName(newName : Text) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update display name");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = newName;
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      name = newName;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public query ({ caller }) func getVotingAbilityStatus() : async Bool {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can check voting ability");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) { return false };
    };
    profile.votingAbility;
  };

  public shared ({ caller }) func updateVotingAbilityStatus(status : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update voting ability");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = status;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      votingAbility = status;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public query ({ caller }) func getPrincipalInfo() : async Principal {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view principal info");
    };
    caller;
  };

  public query ({ caller }) func getSessionStatus() : async Text {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can check session status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) { return "inactive" };
    };
    profile.sessionStatus;
  };

  public shared ({ caller }) func updateSessionStatus(status : Text) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update session status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = status;
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      sessionStatus = status;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  // Privacy tips are public information - allow guest access
  public query func getPrivacyTips() : async [Text] {
    [
      "Use anonymous display names",
      "Keep your principal private",
      "Follow security best practices",
      "Enable two-factor authentication",
      "Regularly review your sessions",
    ];
  };

  // ============================================================================
  // ONBOARDING TRACKING
  // ============================================================================

  public query ({ caller }) func getOnboardingProgress() : async Nat {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view onboarding progress");
    };
    switch (principalMap.get(userProfiles, caller)) {
      case (?profile) { profile.onboardingProgress };
      case (null) { 0 };
    };
  };

  public query ({ caller }) func isOnboardingCompleted() : async Bool {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can check onboarding status");
    };
    switch (principalMap.get(userProfiles, caller)) {
      case (?profile) { profile.onboardingCompleted };
      case (null) { false };
    };
  };

  public shared ({ caller }) func updateOnboardingProgress(progress : Nat, completed : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update onboarding progress");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = progress;
          onboardingCompleted = completed;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      onboardingProgress = progress;
      onboardingCompleted = completed;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public shared ({ caller }) func markWelcomeCompleted(completed : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update welcome status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = completed;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      completedWelcome = completed;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public shared ({ caller }) func markRevolutionaryUpgradesCompleted(completed : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update revolutionary upgrades status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = completed;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      completedRevolutionaryUpgrades = completed;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public shared ({ caller }) func markGetStartedCompleted(completed : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update get started status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = completed;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      completedGetStarted = completed;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public shared ({ caller }) func markDocumentationCompleted(completed : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update documentation status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = completed;
          completedWhitepaper = false;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      completedDocumentation = completed;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public shared ({ caller }) func markWhitepaperCompleted(completed : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update whitepaper status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = completed;
          completedTutorial = false;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      completedWhitepaper = completed;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  public shared ({ caller }) func markTutorialCompleted(completed : Bool) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update tutorial status");
    };
    let profile = switch (principalMap.get(userProfiles, caller)) {
      case (?p) { p };
      case (null) {
        let newProfile : UserProfile = {
          name = "Anonymous";
          votingAbility = false;
          principal = caller;
          sessionStatus = "active";
          privacyTips = [
            "Use anonymous display names",
            "Keep your principal private",
            "Follow security best practices",
          ];
          completedWelcome = false;
          completedRevolutionaryUpgrades = false;
          completedGetStarted = false;
          completedDocumentation = false;
          completedWhitepaper = false;
          completedTutorial = completed;
          onboardingProgress = 0;
          onboardingCompleted = false;
        };
        userProfiles := principalMap.put(userProfiles, caller, newProfile);
        return;
      };
    };

    let updatedProfile : UserProfile = {
      profile with
      completedTutorial = completed;
    };

    userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
  };

  // ============================================================================
  // DECENTRALIZED PoCC MINING SYSTEM
  // ============================================================================

  public type MiningWorker = {
    id : Text;
    owner : Principal;
    cryptographicIdentity : Text;
    hardwareSpecs : Text;
    registeredAt : Int;
    bondAmount : Nat;
    bondToken : Text;
    status : Text;
    verificationStatus : Text;
  };

  public type MiningProof = {
    proofId : Text;
    workerId : Text;
    owner : Principal;
    computationHash : Text;
    cryptographicSignature : Text;
    timestamp : Int;
    cwuAmount : Float;
    verificationStatus : Text;
    verifierConsensus : [VerifierValidation];
    rewardStatus : Text;
    rewardAmount : Float;
  };

  public type VerifierValidation = {
    verifierPrincipal : Principal;
    validationTimestamp : Int;
    validationResult : Bool;
    validationSignature : Text;
  };

  public type MiningAuditEntry = {
    entryId : Text;
    proofId : Text;
    action : Text;
    actorPrincipal : Principal;
    timestamp : Int;
    details : Text;
  };

  public type DecentralizationMetrics = {
    totalWorkers : Nat;
    activeWorkers : Nat;
    totalProofs : Nat;
    verifiedProofs : Nat;
    decentralizationScore : Float;
    averageVerifiers : Float;
    lastUpdated : Int;
  };

  transient let workerMap = OrderedMap.Make<Text>(Text.compare);
  transient let proofMap = OrderedMap.Make<Text>(Text.compare);
  transient let auditMap = OrderedMap.Make<Text>(Text.compare);

  var miningWorkers = workerMap.empty<MiningWorker>();
  var miningProofs = proofMap.empty<MiningProof>();
  var miningAuditLog = auditMap.empty<MiningAuditEntry>();
  var decentralizationMetrics : DecentralizationMetrics = {
    totalWorkers = 0;
    activeWorkers = 0;
    totalProofs = 0;
    verifiedProofs = 0;
    decentralizationScore = 0.0;
    averageVerifiers = 0.0;
    lastUpdated = Time.now();
  };

  // Register Mining Worker
  public shared ({ caller }) func registerMiningWorker(cryptographicIdentity : Text, hardwareSpecs : Text, bondAmount : Nat, bondToken : Text) : async Text {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can register mining workers");
    };

    // Validate bond requirements
    if (bondToken == "ICP" and bondAmount < 1000) {
      Debug.trap("Invalid bond: Minimum 1000 ICP required");
    };
    if (bondToken == "NRN" and bondAmount < 50) {
      Debug.trap("Invalid bond: Minimum 50 NRN required");
    };

    let workerId = "worker-" # Principal.toText(caller) # "-" # debug_show(Time.now());

    let worker : MiningWorker = {
      id = workerId;
      owner = caller;
      cryptographicIdentity;
      hardwareSpecs;
      registeredAt = Time.now();
      bondAmount;
      bondToken;
      status = "active";
      verificationStatus = "verified";
    };

    miningWorkers := workerMap.put(miningWorkers, workerId, worker);

    // Update metrics
    decentralizationMetrics := {
      decentralizationMetrics with
      totalWorkers = decentralizationMetrics.totalWorkers + 1;
      activeWorkers = decentralizationMetrics.activeWorkers + 1;
      lastUpdated = Time.now();
    };

    // Audit log
    let auditEntry : MiningAuditEntry = {
      entryId = "audit-" # debug_show(Time.now());
      proofId = "";
      action = "WORKER_REGISTERED";
      actorPrincipal = caller;
      timestamp = Time.now();
      details = "Worker " # workerId # " registered with bond " # debug_show(bondAmount) # " " # bondToken;
    };
    miningAuditLog := auditMap.put(miningAuditLog, auditEntry.entryId, auditEntry);

    workerId;
  };

  // Submit Mining Proof
  public shared ({ caller }) func submitMiningProof(workerId : Text, computationHash : Text, cryptographicSignature : Text, cwuAmount : Float) : async Text {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can submit mining proofs");
    };

    // Verify worker ownership
    let worker = switch (workerMap.get(miningWorkers, workerId)) {
      case (?w) { w };
      case (null) { Debug.trap("Worker not found") };
    };

    if (worker.owner != caller) {
      Debug.trap("Unauthorized: Can only submit proofs for your own workers");
    };

    if (worker.status != "active") {
      Debug.trap("Worker is not active");
    };

    let proofId = "proof-" # workerId # "-" # debug_show(Time.now());

    // Check for double-mining (proof with same computation hash)
    for ((id, existingProof) in proofMap.entries(miningProofs)) {
      if (existingProof.computationHash == computationHash) {
        Debug.trap("Double-mining detected: Proof with this computation hash already exists");
      };
    };

    let proof : MiningProof = {
      proofId;
      workerId;
      owner = caller;
      computationHash;
      cryptographicSignature;
      timestamp = Time.now();
      cwuAmount;
      verificationStatus = "pending";
      verifierConsensus = [];
      rewardStatus = "pending";
      rewardAmount = 0.0;
    };

    miningProofs := proofMap.put(miningProofs, proofId, proof);

    // Update metrics
    decentralizationMetrics := {
      decentralizationMetrics with
      totalProofs = decentralizationMetrics.totalProofs + 1;
      lastUpdated = Time.now();
    };

    // Audit log
    let auditEntry : MiningAuditEntry = {
      entryId = "audit-" # debug_show(Time.now());
      proofId;
      action = "PROOF_SUBMITTED";
      actorPrincipal = caller;
      timestamp = Time.now();
      details = "Proof " # proofId # " submitted for worker " # workerId # " with CWU " # debug_show(cwuAmount);
    };
    miningAuditLog := auditMap.put(miningAuditLog, auditEntry.entryId, auditEntry);

    proofId;
  };

  // Verify Mining Proof
  public shared ({ caller }) func verifyMiningProof(proofId : Text, validationResult : Bool, validationSignature : Text) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admin verifiers can validate proofs");
    };

    let proof = switch (proofMap.get(miningProofs, proofId)) {
      case (?p) { p };
      case (null) { Debug.trap("Proof not found") };
    };

    // Check if verifier already validated this proof
    for (validation in proof.verifierConsensus.vals()) {
      if (validation.verifierPrincipal == caller) {
        Debug.trap("Verifier already validated this proof");
      };
    };

    let validation : VerifierValidation = {
      verifierPrincipal = caller;
      validationTimestamp = Time.now();
      validationResult;
      validationSignature;
    };

    let updatedConsensus = Array.append(proof.verifierConsensus, [validation]);
    
    // Calculate consensus (require at least 3 verifiers, 2/3 majority)
    let totalVerifiers = updatedConsensus.size();
    var positiveValidations = 0;
    for (v in updatedConsensus.vals()) {
      if (v.validationResult) {
        positiveValidations += 1;
      };
    };

    let newVerificationStatus = if (totalVerifiers >= 3) {
      if (positiveValidations >= 2) {
        "verified"
      } else if (totalVerifiers - positiveValidations >= 2) {
        "rejected"
      } else {
        "pending"
      };
    } else {
      "pending"
    };

    let updatedProof : MiningProof = {
      proof with
      verifierConsensus = updatedConsensus;
      verificationStatus = newVerificationStatus;
    };

    miningProofs := proofMap.put(miningProofs, proofId, updatedProof);

    // Update metrics if verified
    if (newVerificationStatus == "verified" and proof.verificationStatus != "verified") {
      decentralizationMetrics := {
        decentralizationMetrics with
        verifiedProofs = decentralizationMetrics.verifiedProofs + 1;
        averageVerifiers = Float.fromInt(totalVerifiers);
        decentralizationScore = Float.fromInt(decentralizationMetrics.verifiedProofs) / Float.fromInt(decentralizationMetrics.totalProofs);
        lastUpdated = Time.now();
      };
    };

    // Audit log
    let auditEntry : MiningAuditEntry = {
      entryId = "audit-" # debug_show(Time.now());
      proofId;
      action = "PROOF_VERIFIED";
      actorPrincipal = caller;
      timestamp = Time.now();
      details = "Proof " # proofId # " validation: " # debug_show(validationResult) # ", status: " # newVerificationStatus;
    };
    miningAuditLog := auditMap.put(miningAuditLog, auditEntry.entryId, auditEntry);
  };

  // Distribute Mining Reward
  public shared ({ caller }) func distributeMiningReward(proofId : Text, rewardAmount : Float) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can distribute mining rewards");
    };

    let proof = switch (proofMap.get(miningProofs, proofId)) {
      case (?p) { p };
      case (null) { Debug.trap("Proof not found") };
    };

    if (proof.verificationStatus != "verified") {
      Debug.trap("Cannot distribute reward: Proof not verified");
    };

    if (proof.rewardStatus == "distributed") {
      Debug.trap("Reward already distributed for this proof");
    };

    let updatedProof : MiningProof = {
      proof with
      rewardStatus = "distributed";
      rewardAmount;
    };

    miningProofs := proofMap.put(miningProofs, proofId, updatedProof);

    // Audit log
    let auditEntry : MiningAuditEntry = {
      entryId = "audit-" # debug_show(Time.now());
      proofId;
      action = "REWARD_DISTRIBUTED";
      actorPrincipal = caller;
      timestamp = Time.now();
      details = "Reward " # debug_show(rewardAmount) # " NRN distributed for proof " # proofId;
    };
    miningAuditLog := auditMap.put(miningAuditLog, auditEntry.entryId, auditEntry);
  };

  // Query Mining Worker
  public query ({ caller }) func getMiningWorker(workerId : Text) : async ?MiningWorker {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view mining workers");
    };

    let worker = switch (workerMap.get(miningWorkers, workerId)) {
      case (?w) { w };
      case (null) { return null };
    };

    if (worker.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own workers");
    };

    ?worker;
  };

  // Query Mining Proof
  public query ({ caller }) func getMiningProof(proofId : Text) : async ?MiningProof {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view mining proofs");
    };

    let proof = switch (proofMap.get(miningProofs, proofId)) {
      case (?p) { p };
      case (null) { return null };
    };

    if (proof.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own proofs");
    };

    ?proof;
  };

  // List User's Mining Workers
  public query ({ caller }) func listMyMiningWorkers() : async [MiningWorker] {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can list mining workers");
    };

    var workers : [MiningWorker] = [];
    for ((id, worker) in workerMap.entries(miningWorkers)) {
      if (worker.owner == caller) {
        workers := Array.append(workers, [worker]);
      };
    };
    workers;
  };

  // List User's Mining Proofs
  public query ({ caller }) func listMyMiningProofs() : async [MiningProof] {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can list mining proofs");
    };

    var proofs : [MiningProof] = [];
    for ((id, proof) in proofMap.entries(miningProofs)) {
      if (proof.owner == caller) {
        proofs := Array.append(proofs, [proof]);
      };
    };
    proofs;
  };

  // Get Decentralization Metrics
  public query ({ caller }) func getDecentralizationMetrics() : async DecentralizationMetrics {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view decentralization metrics");
    };
    decentralizationMetrics;
  };

  // Get Mining Audit Log
  public query ({ caller }) func getMiningAuditLog() : async [MiningAuditEntry] {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view mining audit log");
    };

    var entries : [MiningAuditEntry] = [];
    for ((id, entry) in auditMap.entries(miningAuditLog)) {
      entries := Array.append(entries, [entry]);
    };
    entries;
  };

  // Get User's Mining Audit Entries
  public query ({ caller }) func getMyMiningAuditEntries() : async [MiningAuditEntry] {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view their audit entries");
    };

    var entries : [MiningAuditEntry] = [];
    for ((id, entry) in auditMap.entries(miningAuditLog)) {
      if (entry.actorPrincipal == caller) {
        entries := Array.append(entries, [entry]);
      };
    };
    entries;
  };

  // Deactivate Mining Worker
  public shared ({ caller }) func deactivateMiningWorker(workerId : Text) : async () {
    ensureAuthenticated(caller);
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can deactivate mining workers");
    };

    let worker = switch (workerMap.get(miningWorkers, workerId)) {
      case (?w) { w };
      case (null) { Debug.trap("Worker not found") };
    };

    if (worker.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only deactivate your own workers");
    };

    let updatedWorker : MiningWorker = {
      worker with
      status = "inactive";
    };

    miningWorkers := workerMap.put(miningWorkers, workerId, updatedWorker);

    // Update metrics
    if (worker.status == "active") {
      decentralizationMetrics := {
        decentralizationMetrics with
        activeWorkers = if (decentralizationMetrics.activeWorkers > 0) {
          decentralizationMetrics.activeWorkers - 1
        } else { 0 };
        lastUpdated = Time.now();
      };
    };

    // Audit log
    let auditEntry : MiningAuditEntry = {
      entryId = "audit-" # debug_show(Time.now());
      proofId = "";
      action = "WORKER_DEACTIVATED";
      actorPrincipal = caller;
      timestamp = Time.now();
      details = "Worker " # workerId # " deactivated";
    };
    miningAuditLog := auditMap.put(miningAuditLog, auditEntry.entryId, auditEntry);
  };

  // ============================================================================
  // PUBLIC INFORMATION (Guest access allowed)
  // ============================================================================

  // Public information - no authentication required (guests can access)
  public query func getNeronFirstPost() : async Text {
    "🚀 Introducing Neron Protocol – the fully on‑chain #DeFi revolution on the #InternetComputer (#ICP). Powered by PoCC Mining, DS Governance & Nash Insurance – proving complete, autonomous finance lives on‑chain. Explore now: [insert app link] #Web3 #NeronProtocol";
  };
};


