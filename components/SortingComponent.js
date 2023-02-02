import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMergedData } from "@/store/actions/getMergedDataAction"; 

const SortingComponent = () => {

    const dispatch = useDispatch();
    const { mergeddata, originalmergeddata } = useSelector((state) => state.getMergedData);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleSort = (sortBy, sortOrder) => {
        setSortBy(sortBy);
        setSortOrder(sortOrder);

        let sortedData = mergeddata.sort((a, b) => {
            if (sortOrder === 'asc') {
                if (a[sortBy] < b[sortBy]) return -1;
                if (a[sortBy] > b[sortBy]) return 1;
                return 0;
            } 
            else {
                if (a[sortBy] > b[sortBy]) return -1;
                if (a[sortBy] < b[sortBy]) return 1;
                return 0;
            }
        });
        dispatch(getMergedData(sortedData, originalmergeddata));
    };

  return (
    <div className='w-full grid grid-cols-6 gap-2 text-sm xs:text-xs'>
      <button className='bg-slate-300 p-2 rounded' onClick={() => handleSort('name', 'asc')}>
        Sort by Name (Ascending)
      </button>
      <button className='bg-slate-300 p-2 rounded' onClick={() => handleSort('name', 'desc')}>
        Sort by Name (Descending)
      </button>
      <button className='bg-slate-300 p-2 rounded' onClick={() => handleSort('phone', 'asc')}>
        Sort by Phone (Ascending)
      </button>
      <button className='bg-slate-300 p-2 rounded' onClick={() => handleSort('phone', 'desc')}>
        Sort by Phone (Descending)
      </button>
      <button className='bg-slate-300 p-2 rounded' onClick={() => handleSort('email', 'asc')}>
        Sort by Email (Ascending)
      </button>
      <button className='bg-slate-300 p-2 rounded' onClick={() => handleSort('email', 'desc')}>
        Sort by Email (Descending)
      </button>
    </div>
  );
}

export default SortingComponent;
