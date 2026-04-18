import Sidebar from '@/components/sidebar-provider'
import TeamTask from '@/components/team-task'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Team",
};

function page() {
    return (
        <Sidebar>
          <TeamTask />
        </Sidebar>
    )
}

export default page