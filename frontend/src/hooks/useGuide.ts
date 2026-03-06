import { useState, useEffect, useCallback } from 'react';
import type { GuideStep } from '@/components/GuideOverlay';
import type { GuideSection } from '@/components/GuideMenu';

const STORAGE_KEY = 'neron-guide-progress';

interface GuideProgress {
  completedSections: string[];
  currentSection: string | null;
  currentStepIndex: number;
}

const GUIDE_SECTIONS: Record<string, GuideStep[]> = {
  mining: [
    {
      id: 'mining-1',
      title: 'Welcome to PoCC Mining',
      description: 'Learn how to participate in Proof-of-Compute-Consumption mining and earn NRN rewards by contributing computational work.',
      section: 'Mining',
      position: 'center',
    },
    {
      id: 'mining-2',
      title: 'Canister Status',
      description: 'Monitor the status of all PoCC canisters: pocc_registry, pocc_taskgen, pocc_verifier, and pocc_monitor. All canisters must be online for mining operations.',
      section: 'Mining',
      targetSelector: '[data-guide="canister-status"]',
      position: 'bottom',
    },
    {
      id: 'mining-3',
      title: 'Current Neumann Period',
      description: 'View the active Neumann Period, CWU targets, and NRN allocation. Period 0 is creator-exclusive with no bond, while Periods 1-5 require either 1,000 ICP or 50 NRN bond.',
      section: 'Mining',
      targetSelector: '[data-guide="neumann-period"]',
      position: 'bottom',
    },
    {
      id: 'mining-4',
      title: 'Worker Registration',
      description: 'Register as a PoCC worker to start mining. Choose your bond type (ICP or NRN) and provide hardware attestation.',
      section: 'Mining',
      targetSelector: '[data-guide="worker-registration"]',
      position: 'top',
    },
    {
      id: 'mining-5',
      title: 'Bond Selection',
      description: 'Select your bond type: 1,000 ICP or 50 NRN for general mining periods. No bond is required for Neumann Period 0.',
      section: 'Mining',
      targetSelector: '[data-guide="bond-selection"]',
      position: 'bottom',
    },
    {
      id: 'mining-6',
      title: 'CWU Formula',
      description: 'Understand how Compute-Work Units (CWU) are calculated: CWU = α*cpu_cycles + β*gpu_flops + γ*memory_reads. Your rewards are proportional to your CWU contribution.',
      section: 'Mining',
      targetSelector: '[data-guide="cwu-formula"]',
      position: 'top',
    },
    {
      id: 'mining-7',
      title: 'Track Your Rewards',
      description: 'View your mining rewards, CWU contributions, and reward status. Rewards are distributed based on your verified computational work.',
      section: 'Mining',
      targetSelector: '[data-guide="rewards"]',
      position: 'top',
    },
  ],
  governance: [
    {
      id: 'governance-1',
      title: 'Welcome to Governance',
      description: 'Participate in protocol governance through the Deterministic Sequence (DS) protocol with Proof of Attendance.',
      section: 'Governance',
      position: 'center',
    },
    {
      id: 'governance-2',
      title: 'Proof of Attendance',
      description: 'Lock NRN tokens (minimum 100 NRN) at any time to declare your attendance and gain voting rights. This feature is always available regardless of the current DS protocol phase.',
      section: 'Governance',
      targetSelector: '[data-guide="proof-of-attendance"]',
      position: 'bottom',
    },
    {
      id: 'governance-3',
      title: 'Lock Your NRN',
      description: 'Enter the amount of NRN you want to lock (minimum 100 NRN). Your tokens will be locked for 30 days as proof of your commitment to participate in governance.',
      section: 'Governance',
      targetSelector: '[data-guide="lock-input"]',
      position: 'bottom',
    },
    {
      id: 'governance-4',
      title: 'Create Proposals',
      description: 'Submit governance proposals to suggest protocol changes. A 10 NRN fee is required for proposal submission.',
      section: 'Governance',
      targetSelector: '[data-guide="create-proposal"]',
      position: 'left',
    },
    {
      id: 'governance-5',
      title: 'Vote on Proposals',
      description: 'Cast your vote during the Voting Phase if you locked NRN tokens. Only participants who locked tokens can vote.',
      section: 'Governance',
      targetSelector: '[data-guide="vote-buttons"]',
      position: 'top',
    },
  ],
  security: [
    {
      id: 'security-1',
      title: 'Welcome to Security',
      description: 'Monitor security systems, view audit logs, and manage access controls to protect the protocol.',
      section: 'Security',
      position: 'center',
    },
    {
      id: 'security-2',
      title: 'Security Status',
      description: 'View the overall security status of the protocol, including active sessions, threats blocked, and audit logs.',
      section: 'Security',
      position: 'center',
    },
    {
      id: 'security-3',
      title: 'Security Systems',
      description: 'Monitor all security components including authentication, access control, encryption, and audit logging.',
      section: 'Security',
      position: 'center',
    },
  ],
  insurance: [
    {
      id: 'insurance-1',
      title: 'Welcome to Insurance',
      description: 'Manage insurance coverage, submit claims, and participate in the SNS Project Integration Program.',
      section: 'Insurance',
      position: 'center',
    },
    {
      id: 'insurance-2',
      title: 'Your Coverage',
      description: 'View your active insurance policies, coverage amounts, and premium payments.',
      section: 'Insurance',
      position: 'center',
    },
    {
      id: 'insurance-3',
      title: 'SNS Integration',
      description: 'Learn about the comprehensive invitation program for all SNS projects to mine NRN through PoCC and participate in cross-protocol insurance.',
      section: 'Insurance',
      position: 'center',
    },
  ],
  monitoring: [
    {
      id: 'monitoring-1',
      title: 'Welcome to Monitoring',
      description: 'Monitor system health, canister status, cycle consumption, and network statistics in real-time.',
      section: 'Monitoring',
      position: 'center',
    },
    {
      id: 'monitoring-2',
      title: 'System Overview',
      description: 'View overall system status including canister health, NNS root control verification, and recent events.',
      section: 'Monitoring',
      position: 'center',
    },
    {
      id: 'monitoring-3',
      title: 'Cycle Consumption',
      description: 'Track real-time cycle consumption across all canisters. Monitor progress toward baseline (300T cycles/month) and peak (10,000T cycles/month) targets.',
      section: 'Monitoring',
      position: 'center',
    },
    {
      id: 'monitoring-4',
      title: 'Canister Health',
      description: 'View detailed health metrics for all protocol canisters including uptime, latency, and operational status.',
      section: 'Monitoring',
      position: 'center',
    },
  ],
  dashboard: [
    {
      id: 'dashboard-1',
      title: 'Welcome to Dashboard',
      description: 'Your central hub for managing PoCC mining, governance participation, and insurance coverage.',
      section: 'Dashboard',
      position: 'center',
    },
    {
      id: 'dashboard-2',
      title: 'Navigation Tabs',
      description: 'Use these tabs to navigate between Mining, Governance, Security, Insurance, Monitoring, and Overview sections.',
      section: 'Dashboard',
      position: 'center',
    },
  ],
};

export function useGuide() {
  const [progress, setProgress] = useState<GuideProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {
          completedSections: [],
          currentSection: null,
          currentStepIndex: 0,
        };
      }
    }
    return {
      completedSections: [],
      currentSection: null,
      currentStepIndex: 0,
    };
  });

  const [isGuideVisible, setIsGuideVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const startSection = useCallback((sectionId: string) => {
    if (GUIDE_SECTIONS[sectionId]) {
      setProgress(prev => ({
        ...prev,
        currentSection: sectionId,
        currentStepIndex: 0,
      }));
      setIsGuideVisible(true);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (!progress.currentSection) return;

    const steps = GUIDE_SECTIONS[progress.currentSection];
    if (progress.currentStepIndex < steps.length - 1) {
      setProgress(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1,
      }));
    } else {
      // Complete section
      setProgress(prev => ({
        ...prev,
        completedSections: [...new Set([...prev.completedSections, prev.currentSection!])],
        currentSection: null,
        currentStepIndex: 0,
      }));
      setIsGuideVisible(false);
    }
  }, [progress.currentSection, progress.currentStepIndex]);

  const previousStep = useCallback(() => {
    if (progress.currentStepIndex > 0) {
      setProgress(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex - 1,
      }));
    }
  }, [progress.currentStepIndex]);

  const skipTutorial = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      currentSection: null,
      currentStepIndex: 0,
    }));
    setIsGuideVisible(false);
  }, []);

  const exitTutorial = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      currentSection: null,
      currentStepIndex: 0,
    }));
    setIsGuideVisible(false);
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({
      completedSections: [],
      currentSection: null,
      currentStepIndex: 0,
    });
    setIsGuideVisible(false);
  }, []);

  const getSections = useCallback((): GuideSection[] => {
    return Object.entries(GUIDE_SECTIONS).map(([id, steps]) => ({
      id,
      title: steps[0].section,
      description: `Learn about ${steps[0].section.toLowerCase()} with ${steps.length} interactive steps`,
      completed: progress.completedSections.includes(id),
      stepCount: steps.length,
    }));
  }, [progress.completedSections]);

  const getCurrentSteps = useCallback((): GuideStep[] => {
    if (!progress.currentSection) return [];
    return GUIDE_SECTIONS[progress.currentSection] || [];
  }, [progress.currentSection]);

  return {
    progress,
    isGuideVisible,
    isMenuOpen,
    setIsMenuOpen,
    startSection,
    nextStep,
    previousStep,
    skipTutorial,
    exitTutorial,
    resetProgress,
    getSections,
    getCurrentSteps,
    currentStepIndex: progress.currentStepIndex,
  };
}
