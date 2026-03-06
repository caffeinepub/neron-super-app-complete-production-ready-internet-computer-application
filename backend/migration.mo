import OrderedMap "mo:base/OrderedMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
  // Deprecated types from the old actor

  type DeprecatedFundingProposal = {
    id : Text;
    title : Text;
    description : Text;
    amountRequested : Nat;
    status : Text;
    createdAt : Int;
    updatedAt : Int;
    contactEmail : Text;
    teamMembers : [Text];
    executiveSummary : Text;
    technicalHighlights : Text;
    fundingAllocation : Text;
    useOfFunds : Text;
    expectedOutcomes : Text;
    callToAction : Text;
    teamDynamics : Text;
    owner : Principal;
  };

  type DeprecatedInsuranceCoverage = {
    id : Text;
    asset : Text;
    coverageAmount : Float;
    premium : Float;
    leverage : Float;
    status : Text;
    createdAt : Int;
    updatedAt : Int;
    owner : Principal;
  };

  type DeprecatedInsuranceFutures = {
    id : Text;
    asset : Text;
    contractSize : Float;
    leverage : Float;
    entryPrice : Float;
    currentPrice : Float;
    pnl : Float;
    status : Text;
    createdAt : Int;
    updatedAt : Int;
    owner : Principal;
  };

  type DeprecatedTradePair = {
    base : Text;
    quote : Text;
    rate : Float;
    slippage : Float;
  };

  type DeprecatedTradeRequest = {
    from : Text;
    to : Text;
    amount : Float;
    rate : Float;
    slippage : Float;
    timestamp : Int;
    owner : Principal;
  };

  type DeprecatedTradeConfirmation = {
    tradeId : Text;
    from : Text;
    to : Text;
    amount : Float;
    rate : Float;
    slippage : Float;
    confirmed : Bool;
    timestamp : Int;
    owner : Principal;
  };

  type DeprecatedDemoStep = {
    id : Text;
    title : Text;
    description : Text;
    targetElement : Text;
    action : Text;
    delay : Nat;
    highlight : Bool;
    animation : Text;
    tooltip : Text;
    nextStep : ?Text;
    prevStep : ?Text;
    section : Text;
    isFinal : Bool;
  };

  type DeprecatedDemoState = {
    currentStep : Text;
    isPaused : Bool;
    isCompleted : Bool;
    progress : Nat;
    totalSteps : Nat;
    section : Text;
    isActive : Bool;
  };

  // Old actor type with deprecated fields
  type OldActor = {
    demoSteps : [DeprecatedDemoStep];
    fundingProposals : OrderedMap.Map<Text, DeprecatedFundingProposal>;
    insuranceCoverages : [DeprecatedInsuranceCoverage];
    insuranceFutures : [DeprecatedInsuranceFutures];
    tradeConfirmations : [DeprecatedTradeConfirmation];
    tradePairs : [DeprecatedTradePair];
    tradeRequests : [DeprecatedTradeRequest];
    userDemoStates : OrderedMap.Map<Principal, DeprecatedDemoState>;
  };

  type NewActor = {};

  public func run(old : OldActor) : NewActor {
    // Intentionally drop deprecated variables
    {};
  };
};

