import PTRLists from '@components/PTRLists'
import Link from 'next/link'

const PtrPage = () => {
    return (
        <div className='mx-auto w-3/4'>
            <h1 className="font-bold text-xl my-4">Property Transfer Lists</h1>
            <div className="flex justify-end my-2">
                <Link href="/records/ptr/create-ptr">
                    <button className="hover:bg-green-700 bg-green-500 p-2 rounded-md text-white ">
                        Create New
                    </button>
                </Link>
            </div>
            <PTRLists />
        </div>
    )
}

export default PtrPage