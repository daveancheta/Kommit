import Conversation from '@/components/conversation'
import CreateGroup from '@/components/create-group'
import Sidebar from '@/components/sidebar-provider'
import Teams from '@/components/team'

function page() {

    return (
        <Sidebar>
            <div className='flex flex-row gap-2'>
                <div className='bg-neutral-200 dark:bg-neutral-900 p-4 w-130 h-[95vh] border rounded-sm overflow-y-auto'>
                    <header className='flex justify-between items-center mb-2'>
                        <h1 className='text-lg'>Chats</h1>
                        <CreateGroup />
                    </header>
                    <hr className='mb-4' />
                    <Teams />
                </div>
               <Conversation />
            </div>
        </Sidebar>
    )
}

export default page