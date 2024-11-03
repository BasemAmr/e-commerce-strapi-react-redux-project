import { LucideServer } from 'lucide-react'
import Button from './ui/Button'
const ErrorHandler = () => {
    return (
        <>
            <div className="container mx-auto p-4">

                <div className='flex justify-center items-center flex-col'>
                    <LucideServer name="error" size="256" />
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Error</h1>
                    
                    <div className='flex space-x-4'>
                        <Button onClick={() => window.location.reload()} variant="primary">Refresh</Button>
                        <Button onClick={() => window.location.replace('/')} variant="primary">Go to Home</Button>       
                    </div>
                
                </div>
            </div>
            
        </>
    )
}

export default ErrorHandler