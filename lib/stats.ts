import dotenv from 'dotenv';
dotenv.config();

if(!process.env.EARNBASE_SECRET) {
    throw new Error('EARNBASE_SECRET is not defined');

}

interface Stats {
    totalParticipants: number;
    totalPaidOut: string;
    totalTasksCompleted: string;
    totalAgentsServed: string;
}

// function to return the stats
export const fetchStats = async () : Promise<Stats> => {
    const response = await fetch('https://earnbase.vercel.app/api/stats', {
        headers: {
            'x-api-key': process.env.EARNBASE_SECRET || '',
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }
    
    return await response.json();
};

