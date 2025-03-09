import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'

const Ratings = () => {

  return (<>
    <DashboardLayout activeMenu={"Ratings"}>
        <p>Ratings</p>
        <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
            <div className="flex flex-col items-start justify-between">
                <p className='text-xl'>Rating Page Coming Soon</p>
            </div>
        </div>
    </DashboardLayout>
    
    </>
  )
}

export default Ratings