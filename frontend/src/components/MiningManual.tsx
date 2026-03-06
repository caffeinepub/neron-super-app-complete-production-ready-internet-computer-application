import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Cpu, 
  Download, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Wifi, 
  Shield,
  CheckCircle2,
  Terminal,
  Play,
  Copy,
  ExternalLink,
  AlertCircle,
  Settings,
  Globe,
  Lock,
  Zap,
  FileCode,
  Chrome,
  Package
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useGetMiningManual } from '@/hooks/useQueries';

interface MiningManualProps {
  variant?: 'full' | 'compact';
}

export default function MiningManual({ variant = 'full' }: MiningManualProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const { data: manualContent, isLoading } = useGetMiningManual();

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success(`${section} copied to clipboard`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopyAll = () => {
    const fullManual = `NERON PROTOCOL - COMPREHENSIVE MINING MANUAL

=== HARDWARE REQUIREMENTS ===

CPU (Central Processing Unit):
- Minimum: Intel Core i7 (8th gen or newer) OR AMD Ryzen 7 (2000 series or newer)
- Recommended: Intel Core i9 OR AMD Ryzen 9
- Excellent Choice: Intel Box Core Ultra 9 285 2.50GHz, 36M Arrow Lake CPU
- What this means: The CPU is your computer's brain. More cores = better mining performance. Multi-core processors handle multiple tasks simultaneously, which is essential for PoCC mining.

Intel Box Core Ultra 9 285 Evaluation:
The Intel Box Core Ultra 9 285 2.50GHz, 36M Arrow Lake CPU is an excellent choice for Neron PoCC mining. Here's what makes it stand out:

Core Count & Performance:
- 16 cores (Performance + Efficiency cores)
- 24 threads for parallel processing
- 2.50GHz base clock with boost capabilities
- 36MB Intel Smart Cache for fast data access

Why It's Great for Mining:
1. Multi-Core Excellence: With 16 cores and 24 threads, this CPU can handle multiple mining tasks simultaneously, significantly improving your CWU (Compute-Work Units) output.
2. Large Cache: The 36MB cache means faster access to frequently used data, reducing latency during computational tasks.
3. Arrow Lake Architecture: Latest generation architecture provides improved efficiency and performance per watt.
4. Balanced Performance: The hybrid core design (Performance + Efficiency cores) optimizes both heavy computational tasks and background operations.

Comparison to Other CPUs:
- vs Intel i7: The Ultra 9 285 offers 33-50% more cores, resulting in significantly higher parallel processing capability.
- vs AMD Ryzen 7: Comparable multi-core performance with better single-thread performance in many workloads.
- vs Intel i9 (previous gen): Similar or better performance with improved power efficiency.

Expected Mining Performance:
- CWU Output: Approximately 40-60% higher than standard i7 processors
- Task Completion: Faster proof generation means more rewards per hour
- Efficiency: Better performance per watt reduces electricity costs
- Reliability: Enterprise-grade stability for 24/7 mining operations

Best Use Cases:
- Professional miners seeking maximum CWU output
- Users running multiple workers simultaneously
- Long-term mining operations requiring reliability
- Miners who want to maximize ROI on hardware investment

Value Proposition:
While the Ultra 9 285 is a premium processor, its superior performance makes it an excellent investment for serious miners. The increased CWU output can result in 40-60% more NRN rewards compared to minimum-spec CPUs, potentially paying for the hardware upgrade within months of mining.

Recommended Pairing:
- RAM: 32GB DDR5 for optimal performance
- Storage: 1TB NVMe SSD for fast data access
- GPU: NVIDIA RTX 4070 or AMD Radeon 7800XT
- Cooling: High-quality CPU cooler for sustained performance

RAM (Memory):
- Minimum: 8GB RAM (basic mining only)
- Recommended: 16GB+ RAM
- Optimal: 32GB RAM for professional mining (especially with Ultra 9 285)
- What this means: RAM is your computer's short-term memory. More RAM allows your system to handle larger computational tasks without slowing down.

Storage:
- Required: SSD (Solid State Drive)
- Minimum: 256GB available space
- Recommended: 512GB+ SSD
- Optimal: 1TB NVMe SSD for best performance
- What this means: SSDs are much faster than traditional hard drives. Faster storage = faster data access = better mining efficiency and higher rewards.

GPU (Graphics Processing Unit):
- Minimum: Integrated graphics (basic mining)
- Recommended: NVIDIA RTX 3060 or better, AMD Radeon 6700XT or better
- Professional: NVIDIA RTX 4070+ or AMD Radeon 7800XT+
- What this means: A dedicated GPU dramatically improves computational performance. GPUs excel at parallel processing, which is perfect for PoCC mining tasks.

Recommended Laptop Models:
1. Dell XPS 15/17 - Excellent build quality, powerful processors, good cooling
2. Lenovo Legion 5/7 - Gaming laptops with strong GPUs, great for mining
3. MacBook Pro M2/M3 - Apple Silicon chips offer excellent performance per watt
4. ASUS ROG Zephyrus - High-performance gaming laptop with excellent cooling
5. HP Omen - Affordable gaming laptop with good mining capabilities

Desktop vs Laptop:
- Desktops: Better cooling, more upgradeable, higher performance potential, can accommodate Ultra 9 285
- Laptops: Portable, all-in-one solution, good for moderate mining

=== SOFTWARE REQUIREMENTS ===

Operating System:
1. Windows 10/11 (Recommended for beginners)
   - Download: https://www.microsoft.com/windows
   - Note: Enable WSL (Windows Subsystem for Linux) for advanced features
   - How to enable WSL: Open PowerShell as Administrator, run: wsl --install

2. macOS (Monterey or newer)
   - Built-in on Mac computers
   - Excellent for Apple Silicon (M1/M2/M3) chips

3. Linux (Ubuntu 22.04 LTS, Debian 11+, Fedora 38+)
   - Download Ubuntu: https://ubuntu.com/download
   - Best for advanced users and maximum performance

Node.js and Package Manager:
1. Install Node.js (v18 or newer):
   - Download: https://nodejs.org
   - Choose LTS (Long Term Support) version
   - Installation includes npm (Node Package Manager)
   
2. Verify installation:
   - Open terminal/command prompt
   - Type: node --version
   - Should show: v18.x.x or higher
   - Type: npm --version
   - Should show: 9.x.x or higher

3. Optional: Install pnpm (faster alternative to npm):
   - Run: npm install -g pnpm
   - Verify: pnpm --version

Internet Computer SDK (dfx) - Optional but Recommended:
1. Install dfx:
   - macOS/Linux: sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   - Windows: Use WSL and run the same command
   
2. Verify installation:
   - Type: dfx --version
   - Should show: dfx 0.15.x or higher

3. What dfx does:
   - Allows direct interaction with IC canisters
   - Useful for advanced mining operations
   - Not required for basic mining

Neron Worker SDK:
1. Download from Neron app (Mining section)
2. Two versions available:
   - Node.js SDK (easier for beginners)
   - Rust SDK (better performance for advanced users)

3. Node.js SDK Installation:
   - Extract downloaded file
   - Open terminal in extracted folder
   - Run: npm install
   - Run: npm start

4. Rust SDK Installation (Advanced):
   - Install Rust: https://rustup.rs
   - Extract downloaded file
   - Run: cargo build --release
   - Run: ./target/release/neron-worker

Web Browser:
- Chrome (Recommended): https://www.google.com/chrome
- Firefox: https://www.mozilla.org/firefox
- Edge: Built-in on Windows
- Brave: https://brave.com (privacy-focused)

=== OTHER REQUIREMENTS ===

Internet Identity (II) Setup:
1. What is Internet Identity?
   - Secure, anonymous authentication system
   - No passwords to remember
   - Uses cryptographic keys stored on your device

2. How to set up:
   - Visit: https://identity.ic0.app
   - Click "Create New" or "Register"
   - Choose authentication method:
     * Security key (USB device like YubiKey) - Most secure
     * Face ID / Touch ID (on supported devices)
     * Recovery phrase (write down and store safely!)
   
3. Important Security Tips:
   - NEVER share your recovery phrase
   - Store recovery phrase in multiple secure locations
   - Consider using a hardware security key for maximum security
   - Enable multiple authentication methods as backup

Bond Requirements:
1. What is a bond?
   - Security deposit to participate in mining
   - Protects network from malicious actors
   - Returned when you stop mining (if no violations)

2. Bond options:
   - Option A: 1,000 ICP (Internet Computer tokens)
   - Option B: 50 NRN (Neron tokens)
   - Creator exemption: No bond required for Neumann Period 0

3. How to acquire bond tokens:
   - ICP: Purchase on exchanges (Coinbase, Binance, etc.)
   - NRN: Earn through mining or purchase from other miners
   - Transfer to your Neron wallet before registering

Internet Connection:
- Minimum: 10 Mbps download, 5 Mbps upload
- Recommended: 50+ Mbps download, 10+ Mbps upload
- Stability: More important than speed
- Avoid: Cellular data (unstable), satellite internet (high latency)
- Best: Wired ethernet connection

Hardware Attestation (Optional but Recommended):
1. What is hardware attestation?
   - Cryptographic proof that your hardware is genuine
   - Increases your worker reputation
   - May lead to higher reward allocation

2. Supported technologies:
   - Intel SGX (Software Guard Extensions)
   - TPM (Trusted Platform Module) 2.0
   - ARM TrustZone
   - Apple Secure Enclave (on Mac)

3. How to check if your device supports it:
   
   Windows:
   - Press Win+R, type: tpm.msc
   - If TPM window opens, you have TPM support
   - For SGX: Download Intel SGX Check utility
   
   macOS:
   - All M1/M2/M3 Macs have Secure Enclave
   - Automatically enabled
   
   Linux:
   - Run: cat /proc/cpuinfo | grep sgx
   - If output shows "sgx", you have SGX support
   - For TPM: ls /dev/tpm*

4. How to enable in BIOS/UEFI:
   - Restart computer
   - Press Del, F2, or F12 during boot (varies by manufacturer)
   - Navigate to Security settings
   - Enable: TPM, Intel SGX, or Platform Trust Technology
   - Save and exit

=== STEP-BY-STEP GUIDE TO START MINING ===

STEP 1: Register as a Worker in the App

1.1 Login to Neron Protocol:
   - Open your web browser
   - Navigate to the Neron Protocol app
   - Click "Login" button
   - Authenticate with Internet Identity
   - Wait for authentication to complete

1.2 Navigate to Mining Section:
   - Click hamburger menu (☰) in top-left corner
   - Select "Home"
   - Click "Mining" tab in horizontal navigation
   - You should see the PoCC Mining interface

1.3 Complete Worker Registration Form:
   - Scroll to "Register as PoCC Worker" section
   - Choose your bond type:
     * Select "ICP Bond" if you have 1,000+ ICP
     * Select "NRN Bond" if you have 50+ NRN
   - Enter bond amount:
     * For ICP: Enter at least 1,000
     * For NRN: Enter at least 50
   - Enter hardware attestation data:
     * If you have SGX/TPM: Run attestation tool (provided in SDK)
     * Copy the attestation string
     * Paste into "Hardware Attestation" field
     * If no attestation: Enter "none" (lower reputation)

1.4 Submit Registration:
   - Review all information carefully
   - Click "Register Worker" button
   - Confirm transaction in wallet
   - Wait for confirmation (usually 5-10 seconds)
   - Save your Worker ID (shown in success message)

STEP 2: Download and Install Worker SDK

2.1 Download SDK:
   - In Mining section, find "Download Worker SDK" button
   - Choose your preferred version:
     * Node.js SDK (recommended for beginners)
     * Rust SDK (for advanced users)
   - Click download button
   - Save file to your computer (e.g., Downloads folder)

2.2 Extract SDK Files:
   - Locate downloaded file (e.g., neron-worker-sdk.zip)
   - Right-click and select "Extract All" (Windows)
   - Or double-click (macOS)
   - Or use: unzip neron-worker-sdk.zip (Linux)
   - Remember the extraction location

2.3 Install Dependencies (Node.js SDK):
   - Open terminal/command prompt
   - Navigate to SDK folder:
     * Windows: cd C:\\Users\\YourName\\Downloads\\neron-worker-sdk
     * macOS/Linux: cd ~/Downloads/neron-worker-sdk
   - Install dependencies:
     * Run: npm install
     * Wait for installation (may take 2-5 minutes)
     * You should see "added X packages" message

2.4 Configure SDK:
   - Open config.json file in text editor
   - Update settings:
     * worker_id: Your Worker ID from Step 1.4
     * network: "mainnet" (or "testnet" for testing)
     * bond_type: "icp" or "nrn" (match your registration)
   - Save file

2.5 Run Worker SDK:
   - In terminal, run: npm start
   - Or for Rust SDK: cargo run --release
   - You should see:
     * "Worker SDK started successfully"
     * "Connected to Neron Protocol"
     * "Fetching tasks..."

STEP 3: Execute Tasks and Submit Proofs

3.1 Understanding the Mining Process:
   - SDK automatically fetches computational tasks
   - Tasks are deterministic puzzles generated on-chain
   - Your computer solves these puzzles
   - SDK generates cryptographic proofs
   - Proofs are submitted to blockchain for verification

3.2 Monitor Task Execution:
   - Watch terminal output for:
     * "Task received: [task_id]"
     * "Executing task..." (with progress bar)
     * "Task completed in X seconds"
     * "Proof generated: [proof_hash]"
     * "Proof submitted successfully"

3.3 Understanding CWU (Compute-Work Units):
   - CWU measures your computational contribution
   - Formula: CWU = α×cpu_cycles + β×gpu_flops + γ×memory_reads
   - Higher CWU = Higher rewards
   - Factors affecting CWU:
     * CPU speed and core count (Ultra 9 285 excels here!)
     * GPU performance (if available)
     * Memory speed
     * Task completion time

3.4 Proof Submission:
   - SDK automatically submits proofs
   - Each proof includes:
     * Task ID
     * Computational result
     * Hardware attestation (if enabled)
     * Timestamp
   - Verification happens on-chain
   - Invalid proofs are rejected (no penalty for honest mistakes)

STEP 4: Monitor Mining Status and Rewards

4.1 Check Mining Dashboard:
   - Return to Neron app in browser
   - Navigate to Mining section
   - View "Mining Statistics" panel:
     * Active workers
     * Total CWU earned
     * Proofs submitted
     * Current Neumann Period

4.2 Track Your Performance:
   - Scroll to "Registered Workers" section
   - Find your worker by ID
   - Check:
     * Status (should be "active")
     * Reputation score (increases over time)
     * Bond status
     * Total CWU contributed

4.3 View Rewards:
   - Scroll to "Recent Rewards" section
   - Each reward shows:
     * Reward ID
     * CWU earned
     * NRN amount
     * Status (pending/confirmed)
     * Neumann Period

4.4 Understand Reward Calculation:
   - Formula: reward = (your_CWU / total_period_CWU) × period_allocation
   - Example:
     * You earned: 1,000 CWU
     * Total period CWU: 100,000
     * Period allocation: 8,000,000 NRN
     * Your reward: (1,000/100,000) × 8,000,000 = 80,000 NRN

4.5 Check Wallet Balance:
   - Click hamburger menu (☰)
   - Select "Wallet"
   - View NRN balance
   - Rewards are automatically credited
   - Transaction history shows all mining rewards

STEP 5: Withdraw and Manage NRN

5.1 View Vesting Schedule:
   - Some rewards may have vesting periods
   - Check "Vesting Schedule" in wallet
   - Shows:
     * Total vested amount
     * Release schedule
     * Next release date

5.2 Withdraw Available NRN:
   - In Wallet section
   - Click "Send" button
   - Enter recipient address (your external wallet)
   - Enter amount to withdraw
   - Confirm transaction
   - Wait for confirmation

5.3 Use NRN for Governance:
   - Navigate to Governance section
   - Lock NRN for voting rights
   - Minimum: 100 NRN
   - Lock period: 30 days
   - Participate in protocol decisions

=== TROUBLESHOOTING COMMON ISSUES ===

Issue 1: SDK Won't Start
Symptoms: Error messages when running npm start
Solutions:
- Check Node.js version: node --version (need v18+)
- Reinstall dependencies: rm -rf node_modules && npm install
- Check config.json for syntax errors
- Ensure Worker ID is correct
- Try running with: npm start --verbose (shows detailed errors)

Issue 2: No Tasks Being Received
Symptoms: SDK running but no tasks appear
Solutions:
- Check internet connection
- Verify Worker ID is registered on-chain
- Ensure bond is confirmed
- Check if Neumann Period is active
- Restart SDK
- Check firewall settings (allow outbound connections)

Issue 3: Proofs Being Rejected
Symptoms: "Proof verification failed" messages
Solutions:
- Check hardware attestation is valid
- Ensure system time is synchronized
- Verify computational results are correct
- Update SDK to latest version
- Check for hardware issues (overheating, instability)
- Reduce mining intensity if system is unstable

Issue 4: Low Reputation Score
Symptoms: Reputation not increasing or decreasing
Solutions:
- Enable hardware attestation
- Ensure 100% uptime (keep SDK running)
- Submit proofs consistently
- Avoid failed proof submissions
- Upgrade hardware if possible (consider Ultra 9 285)
- Check for system stability issues

Issue 5: Hardware Attestation Not Working
Symptoms: Cannot enable SGX/TPM
Solutions:
- Update BIOS/UEFI to latest version
- Enable in BIOS settings (see Hardware Attestation section)
- Check if hardware supports attestation
- Install manufacturer drivers
- For Intel SGX: Install Intel SGX driver
- For TPM: Enable in Windows Security settings

Issue 6: High CPU/GPU Temperature
Symptoms: System overheating, thermal throttling
Solutions:
- Improve cooling (clean fans, better airflow)
- Reduce mining intensity in config.json
- Use laptop cooling pad
- Apply new thermal paste (advanced)
- Lower room temperature
- Consider undervolting CPU/GPU (advanced)
- Note: Ultra 9 285 requires good cooling for sustained performance

Issue 7: Network Connection Issues
Symptoms: Frequent disconnections, timeouts
Solutions:
- Use wired ethernet instead of WiFi
- Check router settings (disable power saving)
- Ensure stable internet connection
- Configure port forwarding if behind firewall
- Contact ISP if persistent issues
- Try different DNS servers (8.8.8.8, 1.1.1.1)

Issue 8: Wallet Not Showing Rewards
Symptoms: Mined NRN not appearing in wallet
Solutions:
- Refresh wallet page
- Check transaction history
- Verify rewards are confirmed (not pending)
- Check vesting schedule
- Clear browser cache
- Try different browser
- Contact support if rewards are missing after 24 hours

=== OPTIMIZATION TIPS ===

1. Maximize CWU Output:
   - Overclock CPU/GPU (if experienced)
   - Optimize cooling for sustained performance
   - Close unnecessary background applications
   - Use high-performance power plan
   - Ensure adequate RAM (32GB with Ultra 9 285)
   - Consider upgrading to Ultra 9 285 for 40-60% more CWU

2. Improve Reputation:
   - Enable hardware attestation
   - Maintain 99%+ uptime
   - Submit proofs consistently
   - Avoid proof failures
   - Keep SDK updated

3. Reduce Costs:
   - Mine during off-peak electricity hours
   - Use energy-efficient hardware (Ultra 9 285 has good efficiency)
   - Optimize power settings
   - Consider renewable energy
   - Join mining pools (when available)

4. Monitor Performance:
   - Use system monitoring tools
   - Track CWU per hour
   - Monitor temperature and power usage
   - Keep logs for troubleshooting
   - Set up alerts for issues

=== SAFETY AND SECURITY ===

1. Protect Your Identity:
   - Never share recovery phrase
   - Use hardware security keys
   - Enable 2FA where possible
   - Keep software updated

2. Secure Your Funds:
   - Use hardware wallet for large amounts
   - Verify all transactions
   - Be cautious of phishing attempts
   - Only use official Neron Protocol website

3. System Security:
   - Keep OS and software updated
   - Use antivirus software
   - Enable firewall
   - Regular backups
   - Secure physical access to mining device

4. Network Security:
   - Use VPN if concerned about privacy
   - Secure WiFi with strong password
   - Monitor network traffic
   - Be cautious on public networks

=== GETTING HELP ===

If you need assistance:
1. Check this manual first
2. Visit Neron Protocol documentation
3. Join community Discord/Telegram
4. Contact support through app
5. Check GitHub issues (for SDK problems)

Remember: Mining is a long-term commitment. Be patient, keep learning, and optimize your setup over time!

Happy Mining! 🚀`;

    navigator.clipboard.writeText(fullManual);
    toast.success('Complete mining manual copied to clipboard');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Mining Manual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Comprehensive Mining Manual
            </CardTitle>
            <CardDescription>
              Complete beginner-friendly guide to hardware, software, and step-by-step mining instructions
            </CardDescription>
          </div>
          <Button onClick={handleCopyAll} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy Complete Manual
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section 1: Hardware Requirements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              1. Hardware Requirements
            </h3>
            <Button
              onClick={() => handleCopy(
                "Hardware Requirements:\n\nCPU: Intel i7/i9 or AMD Ryzen 7/9 (multi-core recommended)\nExcellent Choice: Intel Box Core Ultra 9 285 2.50GHz, 36M Arrow Lake CPU\nRAM: 16GB+ (8GB minimum)\nStorage: SSD required\nGPU: NVIDIA RTX 3060+ or AMD Radeon 6700XT+\n\nRecommended Laptops:\n- Dell XPS 15/17\n- Lenovo Legion 5/7\n- MacBook Pro M2/M3\n- ASUS ROG Zephyrus\n- HP Omen",
                "Hardware Requirements"
              )}
              variant="ghost"
              size="sm"
            >
              <Copy className={`h-4 w-4 ${copiedSection === "Hardware Requirements" ? "text-primary" : ""}`} />
            </Button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">CPU</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Minimum:</strong> Intel i7 (8th gen+) or AMD Ryzen 7 (2000+)
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Recommended:</strong> Intel i9 or AMD Ryzen 9
              </p>
              <p className="text-sm font-semibold text-primary">
                <strong>Excellent Choice:</strong> Intel Box Core Ultra 9 285
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>What this means:</strong> More cores = better mining performance. The Ultra 9 285 with 16 cores and 24 threads offers 40-60% higher CWU output than standard i7 processors.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">RAM</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Minimum:</strong> 8GB (basic mining)
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Recommended:</strong> 16GB+
              </p>
              <p className="text-sm font-semibold text-primary">
                <strong>Optimal:</strong> 32GB (especially with Ultra 9 285)
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>What this means:</strong> More RAM allows handling larger computational tasks without slowing down.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Storage</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Required:</strong> SSD (Solid State Drive)
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Minimum:</strong> 256GB available
              </p>
              <p className="text-sm font-semibold text-primary">
                <strong>Optimal:</strong> 1TB NVMe SSD
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>What this means:</strong> SSDs are much faster than hard drives. Faster storage = better mining efficiency.
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">GPU</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Recommended:</strong> NVIDIA RTX 3060+ or AMD Radeon 6700XT+
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Professional:</strong> RTX 4070+ or Radeon 7800XT+
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>What this means:</strong> Dedicated GPU dramatically improves performance. GPUs excel at parallel processing.
              </p>
            </div>
          </div>

          {/* Intel Ultra 9 285 Detailed Evaluation */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100">Intel Box Core Ultra 9 285 - Detailed Evaluation</h4>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Technical Specifications:</p>
                <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                  <li>• <strong>16 cores</strong> (Performance + Efficiency cores)</li>
                  <li>• <strong>24 threads</strong> for parallel processing</li>
                  <li>• <strong>2.50GHz base clock</strong> with boost capabilities</li>
                  <li>• <strong>36MB Intel Smart Cache</strong> for fast data access</li>
                  <li>• <strong>Arrow Lake architecture</strong> (latest generation)</li>
                </ul>
              </div>

              <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Why It's Excellent for Neron Mining:</p>
                <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                  <li>• <strong>Multi-Core Excellence:</strong> 16 cores and 24 threads handle multiple mining tasks simultaneously, significantly improving CWU output</li>
                  <li>• <strong>Large Cache:</strong> 36MB cache means faster access to frequently used data, reducing latency during computational tasks</li>
                  <li>• <strong>Arrow Lake Architecture:</strong> Latest generation provides improved efficiency and performance per watt</li>
                  <li>• <strong>Balanced Performance:</strong> Hybrid core design optimizes both heavy computational tasks and background operations</li>
                </ul>
              </div>

              <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Performance Comparison:</p>
                <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                  <li>• <strong>vs Intel i7:</strong> 33-50% more cores = significantly higher parallel processing capability</li>
                  <li>• <strong>vs AMD Ryzen 7:</strong> Comparable multi-core performance with better single-thread performance</li>
                  <li>• <strong>vs Intel i9 (previous gen):</strong> Similar or better performance with improved power efficiency</li>
                </ul>
              </div>

              <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Expected Mining Performance:</p>
                <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                  <li>• <strong>CWU Output:</strong> Approximately 40-60% higher than standard i7 processors</li>
                  <li>• <strong>Task Completion:</strong> Faster proof generation means more rewards per hour</li>
                  <li>• <strong>Efficiency:</strong> Better performance per watt reduces electricity costs</li>
                  <li>• <strong>Reliability:</strong> Enterprise-grade stability for 24/7 mining operations</li>
                </ul>
              </div>

              <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Best Use Cases:</p>
                <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                  <li>• Professional miners seeking maximum CWU output</li>
                  <li>• Users running multiple workers simultaneously</li>
                  <li>• Long-term mining operations requiring reliability</li>
                  <li>• Miners who want to maximize ROI on hardware investment</li>
                </ul>
              </div>

              <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Value Proposition:</p>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  While the Ultra 9 285 is a premium processor, its superior performance makes it an excellent investment for serious miners. 
                  The increased CWU output can result in <strong>40-60% more NRN rewards</strong> compared to minimum-spec CPUs, potentially 
                  paying for the hardware upgrade within months of mining.
                </p>
              </div>

              <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Recommended Pairing:</p>
                <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                  <li>• <strong>RAM:</strong> 32GB DDR5 for optimal performance</li>
                  <li>• <strong>Storage:</strong> 1TB NVMe SSD for fast data access</li>
                  <li>• <strong>GPU:</strong> NVIDIA RTX 4070 or AMD Radeon 7800XT</li>
                  <li>• <strong>Cooling:</strong> High-quality CPU cooler for sustained performance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-2">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Recommended Laptop Models
            </h4>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>• <strong>Dell XPS 15/17:</strong> Excellent build quality, powerful processors, good cooling</li>
              <li>• <strong>Lenovo Legion 5/7:</strong> Gaming laptops with strong GPUs, great for mining</li>
              <li>• <strong>MacBook Pro M2/M3:</strong> Apple Silicon offers excellent performance per watt</li>
              <li>• <strong>ASUS ROG Zephyrus:</strong> High-performance with excellent cooling</li>
              <li>• <strong>HP Omen:</strong> Affordable gaming laptop with good mining capabilities</li>
            </ul>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              <strong>Note:</strong> Desktop systems can accommodate the Ultra 9 285 for maximum performance. Laptops are portable but may have thermal limitations.
            </p>
          </div>
        </div>

        <Separator />

        {/* Section 2: Software Requirements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              2. Software Requirements
            </h3>
            <Button
              onClick={() => handleCopy(
                "Software Requirements:\n\n1. Operating System:\n- Windows 10/11 (with WSL)\n- macOS (Monterey or newer)\n- Linux (Ubuntu 22.04 LTS, Debian 11+, Fedora 38+)\n\n2. Node.js v18+ and npm/pnpm\nDownload: https://nodejs.org\n\n3. dfx (Internet Computer SDK) - Optional\nInstall: sh -ci \"$(curl -fsSL https://internetcomputer.org/install.sh)\"\n\n4. Neron Worker SDK (downloadable from app)\n\n5. Modern web browser (Chrome, Firefox, Edge)",
                "Software Requirements"
              )}
              variant="ghost"
              size="sm"
            >
              <Copy className={`h-4 w-4 ${copiedSection === "Software Requirements" ? "text-primary" : ""}`} />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Operating System</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Windows 10/11:</strong> Enable WSL (Windows Subsystem for Linux)</p>
                    <p className="text-xs pl-4">→ Open PowerShell as Admin, run: <code className="bg-muted px-1 rounded">wsl --install</code></p>
                    <p><strong>macOS:</strong> Monterey or newer (built-in)</p>
                    <p><strong>Linux:</strong> Ubuntu 22.04 LTS, Debian 11+, or Fedora 38+</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <FileCode className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Node.js & Package Manager</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>1. Install Node.js v18+:</strong></p>
                    <p className="text-xs pl-4">→ Download from: <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://nodejs.org</a></p>
                    <p className="text-xs pl-4">→ Choose LTS (Long Term Support) version</p>
                    <p><strong>2. Verify installation:</strong></p>
                    <div className="text-xs pl-4 space-y-1">
                      <p>→ Open terminal, type: <code className="bg-muted px-1 rounded">node --version</code></p>
                      <p>→ Should show: v18.x.x or higher</p>
                      <p>→ Type: <code className="bg-muted px-1 rounded">npm --version</code></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Terminal className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Internet Computer SDK (dfx) - Optional</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Install command:</strong></p>
                    <code className="block bg-muted p-2 rounded text-xs break-all">
                      sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
                    </code>
                    <p className="text-xs"><strong>What it does:</strong> Allows direct interaction with IC canisters (useful for advanced operations)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Neron Worker SDK</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Download from the Mining section of the Neron app</p>
                    <p><strong>Two versions available:</strong></p>
                    <p className="text-xs pl-4">→ <strong>Node.js SDK:</strong> Easier for beginners</p>
                    <p className="text-xs pl-4">→ <strong>Rust SDK:</strong> Better performance for advanced users</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Chrome className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Web Browser</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Chrome (Recommended): <a href="https://www.google.com/chrome" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Download</a></p>
                    <p>• Firefox: <a href="https://www.mozilla.org/firefox" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Download</a></p>
                    <p>• Edge: Built-in on Windows</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section 3: Other Requirements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              3. Other Requirements
            </h3>
            <Button
              onClick={() => handleCopy(
                "Other Requirements:\n\n1. Internet Identity (II):\n- Visit: https://identity.ic0.app\n- Create new identity\n- Choose authentication method (security key, Face ID, recovery phrase)\n- NEVER share recovery phrase!\n\n2. Bond Requirements:\n- Option A: 1,000 ICP\n- Option B: 50 NRN\n- Creator exemption: No bond for Neumann Period 0\n\n3. Internet Connection:\n- Minimum: 10 Mbps download, 5 Mbps upload\n- Recommended: 50+ Mbps download, 10+ Mbps upload\n- Wired ethernet preferred\n\n4. Hardware Attestation (Optional):\n- Intel SGX, TPM 2.0, ARM TrustZone, or Apple Secure Enclave\n- Increases reputation and may improve rewards",
                "Other Requirements"
              )}
              variant="ghost"
              size="sm"
            >
              <Copy className={`h-4 w-4 ${copiedSection === "Other Requirements" ? "text-primary" : ""}`} />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Internet Identity (II) Setup</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>What is it?</strong> Secure, anonymous authentication with no passwords</p>
                    <p><strong>How to set up:</strong></p>
                    <ol className="text-xs pl-4 space-y-1 list-decimal">
                      <li>Visit: <a href="https://identity.ic0.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://identity.ic0.app</a></li>
                      <li>Click "Create New" or "Register"</li>
                      <li>Choose authentication method:
                        <ul className="pl-4 mt-1 space-y-1">
                          <li>• Security key (USB device) - Most secure</li>
                          <li>• Face ID / Touch ID (on supported devices)</li>
                          <li>• Recovery phrase (write down and store safely!)</li>
                        </ul>
                      </li>
                    </ol>
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded p-2 mt-2">
                      <p className="text-xs text-red-900 dark:text-red-100 font-semibold">⚠️ NEVER share your recovery phrase!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Bond Requirements</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>What is a bond?</strong> Security deposit to participate in mining (returned when you stop, if no violations)</p>
                    <p><strong>Bond options:</strong></p>
                    <ul className="text-xs pl-4 space-y-1">
                      <li>• <strong>Option A:</strong> 1,000 ICP (Internet Computer tokens)</li>
                      <li>• <strong>Option B:</strong> 50 NRN (Neron tokens)</li>
                      <li>• <strong>Creator exemption:</strong> No bond required for Neumann Period 0</li>
                    </ul>
                    <p className="text-xs"><strong>How to acquire:</strong> Purchase ICP on exchanges (Coinbase, Binance) or earn NRN through mining</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Wifi className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Internet Connection</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Minimum:</strong> 10 Mbps download, 5 Mbps upload</p>
                    <p><strong>Recommended:</strong> 50+ Mbps download, 10+ Mbps upload</p>
                    <p className="text-xs"><strong>Important:</strong> Stability is more important than speed. Wired ethernet connection is best.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-sm">Hardware Attestation (Optional but Recommended)</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>What is it?</strong> Cryptographic proof that your hardware is genuine. Increases reputation and may improve rewards.</p>
                    <p><strong>Supported technologies:</strong></p>
                    <ul className="text-xs pl-4 space-y-1">
                      <li>• Intel SGX (Software Guard Extensions)</li>
                      <li>• TPM (Trusted Platform Module) 2.0</li>
                      <li>• ARM TrustZone</li>
                      <li>• Apple Secure Enclave (on Mac)</li>
                    </ul>
                    <p><strong>How to check if supported:</strong></p>
                    <ul className="text-xs pl-4 space-y-1">
                      <li>• <strong>Windows:</strong> Press Win+R, type <code className="bg-muted px-1 rounded">tpm.msc</code></li>
                      <li>• <strong>macOS:</strong> All M1/M2/M3 Macs have Secure Enclave</li>
                      <li>• <strong>Linux:</strong> Run <code className="bg-muted px-1 rounded">cat /proc/cpuinfo | grep sgx</code></li>
                    </ul>
                    <p><strong>How to enable in BIOS:</strong></p>
                    <ol className="text-xs pl-4 space-y-1 list-decimal">
                      <li>Restart computer</li>
                      <li>Press Del, F2, or F12 during boot</li>
                      <li>Navigate to Security settings</li>
                      <li>Enable: TPM, Intel SGX, or Platform Trust Technology</li>
                      <li>Save and exit</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section 4: Step-by-Step Guide */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              4. Step-by-Step Guide to Start Mining
            </h3>
            <Button
              onClick={() => handleCopy(
                "Step-by-Step Guide:\n\nSTEP 1: Register as a Worker\n1. Login with Internet Identity\n2. Navigate to Mining section\n3. Complete registration form\n4. Choose bond type (1,000 ICP or 50 NRN)\n5. Enter hardware attestation\n6. Submit registration\n\nSTEP 2: Download and Install SDK\n1. Download Worker SDK from app\n2. Extract files\n3. Install dependencies: npm install\n4. Configure config.json\n5. Run: npm start\n\nSTEP 3: Execute Tasks\n1. SDK automatically fetches tasks\n2. Monitor terminal output\n3. Tasks are solved automatically\n4. Proofs submitted on-chain\n\nSTEP 4: Monitor Status\n1. Check Mining Dashboard\n2. View worker performance\n3. Track rewards\n4. Check wallet balance\n\nSTEP 5: Withdraw NRN\n1. View vesting schedule\n2. Withdraw available NRN\n3. Use for governance or trading",
                "Step-by-Step Guide"
              )}
              variant="ghost"
              size="sm"
            >
              <Copy className={`h-4 w-4 ${copiedSection === "Step-by-Step Guide" ? "text-primary" : ""}`} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 border-l-4 border-primary bg-muted/30 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 1</Badge>
                <div className="space-y-2 flex-1">
                  <p className="font-semibold">Register as a Worker in the App</p>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>Login to Neron Protocol with Internet Identity</li>
                    <li>Click hamburger menu (☰) → Home → Mining tab</li>
                    <li>Scroll to "Register as PoCC Worker" section</li>
                    <li>Choose bond type: ICP (1,000+) or NRN (50+)</li>
                    <li>Enter bond amount</li>
                    <li>Enter hardware attestation data (or "none")</li>
                    <li>Click "Register Worker" and confirm</li>
                    <li>Save your Worker ID from success message</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="p-4 border-l-4 border-primary bg-muted/30 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 2</Badge>
                <div className="space-y-2 flex-1">
                  <p className="font-semibold">Download and Install Worker SDK</p>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>In Mining section, click "Download Worker SDK"</li>
                    <li>Choose Node.js SDK (recommended) or Rust SDK</li>
                    <li>Extract downloaded file to a folder</li>
                    <li>Open terminal in that folder</li>
                    <li>Run: <code className="bg-muted px-1 rounded">npm install</code></li>
                    <li>Edit config.json with your Worker ID</li>
                    <li>Run: <code className="bg-muted px-1 rounded">npm start</code></li>
                    <li>Verify "Worker SDK started successfully" message</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="p-4 border-l-4 border-primary bg-muted/30 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 3</Badge>
                <div className="space-y-2 flex-1">
                  <p className="font-semibold">Execute Tasks and Submit Proofs</p>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>How it works:</strong></p>
                    <ul className="space-y-1 pl-4">
                      <li>• SDK automatically fetches computational tasks</li>
                      <li>• Your computer solves deterministic puzzles</li>
                      <li>• SDK generates cryptographic proofs</li>
                      <li>• Proofs submitted to blockchain for verification</li>
                    </ul>
                    <p><strong>Monitor terminal for:</strong></p>
                    <ul className="space-y-1 pl-4">
                      <li>• "Task received: [task_id]"</li>
                      <li>• "Executing task..." (with progress)</li>
                      <li>• "Proof generated: [proof_hash]"</li>
                      <li>• "Proof submitted successfully"</li>
                    </ul>
                    <p className="text-xs text-primary font-semibold mt-2">
                      💡 With Intel Ultra 9 285: Expect 40-60% faster task completion and higher CWU output!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-l-4 border-primary bg-muted/30 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 4</Badge>
                <div className="space-y-2 flex-1">
                  <p className="font-semibold">Monitor Mining Status and Rewards</p>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>Return to Neron app in browser</li>
                    <li>Navigate to Mining section</li>
                    <li>View "Mining Statistics" panel</li>
                    <li>Check "Registered Workers" for your worker status</li>
                    <li>View "Recent Rewards" section for earnings</li>
                    <li>Check Wallet for automatic NRN crediting</li>
                  </ol>
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                    <p className="text-xs text-green-900 dark:text-green-100">
                      <strong>Reward Formula:</strong> reward = (your_CWU / total_period_CWU) × period_allocation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-l-4 border-primary bg-muted/30 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 5</Badge>
                <div className="space-y-2 flex-1">
                  <p className="font-semibold">Withdraw and Manage NRN</p>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>Click hamburger menu → Wallet</li>
                    <li>Check vesting schedule (some rewards may vest over time)</li>
                    <li>Click "Send" to withdraw available NRN</li>
                    <li>Enter recipient address and amount</li>
                    <li>Confirm transaction</li>
                    <li>Or use NRN for governance (lock 100+ NRN for voting)</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Troubleshooting Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Troubleshooting Common Issues
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 border border-border rounded-lg">
              <p className="font-semibold text-sm mb-2">SDK Won't Start</p>
              <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                <li>• Check Node.js version: <code className="bg-muted px-1 rounded">node --version</code> (need v18+)</li>
                <li>• Reinstall dependencies: <code className="bg-muted px-1 rounded">rm -rf node_modules && npm install</code></li>
                <li>• Check config.json for syntax errors</li>
                <li>• Verify Worker ID is correct</li>
              </ul>
            </div>

            <div className="p-3 border border-border rounded-lg">
              <p className="font-semibold text-sm mb-2">No Tasks Being Received</p>
              <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                <li>• Check internet connection</li>
                <li>• Verify Worker ID is registered on-chain</li>
                <li>• Ensure bond is confirmed</li>
                <li>• Check if Neumann Period is active</li>
                <li>• Restart SDK</li>
              </ul>
            </div>

            <div className="p-3 border border-border rounded-lg">
              <p className="font-semibold text-sm mb-2">Proofs Being Rejected</p>
              <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                <li>• Check hardware attestation is valid</li>
                <li>• Ensure system time is synchronized</li>
                <li>• Update SDK to latest version</li>
                <li>• Check for hardware issues (overheating, instability)</li>
              </ul>
            </div>

            <div className="p-3 border border-border rounded-lg">
              <p className="font-semibold text-sm mb-2">Hardware Attestation Not Working</p>
              <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                <li>• Update BIOS/UEFI to latest version</li>
                <li>• Enable in BIOS settings (see Hardware Attestation section)</li>
                <li>• Check if hardware supports attestation</li>
                <li>• Install manufacturer drivers</li>
              </ul>
            </div>

            <div className="p-3 border border-border rounded-lg">
              <p className="font-semibold text-sm mb-2">High CPU Temperature (especially with Ultra 9 285)</p>
              <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                <li>• Ensure adequate cooling (high-quality CPU cooler required)</li>
                <li>• Clean fans and improve airflow</li>
                <li>• Consider undervolting for better thermal performance</li>
                <li>• Monitor temperatures during mining (should stay below 85°C)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        {variant === 'full' && (
          <>
            <Separator />
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-semibold mb-3 text-green-900 dark:text-green-100 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Quick Reference
              </h4>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-green-800 dark:text-green-200">Min CPU:</span>
                  <span className="text-green-900 dark:text-green-100 font-medium">Intel i7 / AMD Ryzen 7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-800 dark:text-green-200">Excellent CPU:</span>
                  <span className="text-green-900 dark:text-green-100 font-medium">Intel Ultra 9 285</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-800 dark:text-green-200">Min RAM:</span>
                  <span className="text-green-900 dark:text-green-100 font-medium">8GB (16GB+ recommended)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-800 dark:text-green-200">Storage:</span>
                  <span className="text-green-900 dark:text-green-100 font-medium">SSD Required</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-800 dark:text-green-200">GPU:</span>
                  <span className="text-green-900 dark:text-green-100 font-medium">RTX 3060+ / Radeon 6700XT+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-800 dark:text-green-200">Min Bond:</span>
                  <span className="text-green-900 dark:text-green-100 font-medium">1,000 ICP or 50 NRN</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleCopyAll} className="flex-1">
            <Copy className="h-4 w-4 mr-2" />
            Copy Complete Manual
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open('https://neron-protocol.com/mining-manual.pdf', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
