import { PublishingPulse } from "@/components/dashboard/publishing-pulse";
import { CampaignsPanel } from "@/components/dashboard/campaigns-panel";
import { PlatformsPanel } from "@/components/dashboard/platforms-panel";
import { CommandBar } from "@/components/dashboard/command-bar";
import { OperationalSummary } from "@/components/dashboard/operational-summary";
import { ExecutiveMetrics } from "@/components/dashboard/executive-metrics";
import { ActionCenter } from "@/components/dashboard/action-center";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-5 pb-8 w-full max-w-[1600px] mx-auto">
      {/* 
        Mobile Order strategy:
        1. Operational Summary (order-1)
        2. Action Center / Alerts (order-2)
        3. Publishing Pulse (order-3)
        4. Executive Metrics (order-4)
        5. Campaigns (order-5)
        6. Platforms (order-6)
      */}
      
      {/* Row 1: Command Bar (Desktop only, hidden on mobile) */}
      <div className="hidden lg:block">
        <CommandBar />
      </div>

      {/* Main Grid Wrapper for Mobile Ordering */}
      <div className="flex flex-col lg:contents gap-4 md:gap-5">
        
        {/* Live operations summary */}
        <div className="order-1 lg:order-none">
          <OperationalSummary />
        </div>

        {/* Action Center - Moved up on mobile */}
        <div className="order-2 lg:hidden h-[400px]">
          <ActionCenter />
        </div>

        {/* Primary operational workspace: Pulse (Mobile order 3, Desktop Row 4) */}
        <div className="order-3 lg:order-none grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          <div className="lg:col-span-8">
            <div className="h-[500px]">
              <PublishingPulse />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4">
            <div className="h-[500px]">
              <ActionCenter />
            </div>
          </div>
        </div>

        {/* Executive metrics (Mobile order 4, Desktop Row 3) */}
        <div className="order-4 lg:order-none">
           <ExecutiveMetrics />
        </div>

        {/* Campaign and platform execution */}
        <div className="order-5 lg:order-none grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          <div className="lg:col-span-8">
            <div className="h-[460px]">
              <CampaignsPanel />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-[460px]">
              <PlatformsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
