import { useState, useEffect } from "react";
import axios from "axios";
import {merge} from 'react-merge'

// redux
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../store/actions/getUserAction";
import { getCourseData } from "@/store/actions/getCourseAction";
import { getMergedData } from "@/store/actions/getMergedDataAction";
import { getFeesData } from "@/store/actions/getFeesAction";
import { getConvertedFeesData } from "@/store/actions/getConvertedFeesAction";
import { getFeesSymbol } from "@/store/actions/getFeesSymbolAction";

// components
import SearchComponent from "./Search";
import CurrencyComponent from "./CurrencyDropdown";
import SortingComponent from "./SortingComponent";

const TableComponent = () => {
    
    const dispatch = useDispatch();
    const { userdata } = useSelector((state) => state.getUserData);
    const { coursedata } = useSelector((state) => state.getCourseData);
    const { mergeddata, originalmergeddata } = useSelector((state) => state.getMergedData);
    const { fees } = useSelector((state) => state.getFeesData);
    const { convertedfees } = useSelector((state) => state.getConvertedFeesData);
    const { feessymbol } = useSelector((state) => state.getFeesSymbol);

    const [isReady, setReady] = useState(false);

    // get user and course data
    useEffect(()=>{
        axios.get(process.env.USERS_API_URL).then(response => {
          dispatch(getUserData(response.data));
        });

        axios.get(process.env.USERS_COURSES_API_URL).then(response => {
          dispatch(getCourseData(response.data));

          //set original fees data
          let originalfees = [];
          response.data.forEach(el => {
            originalfees.push(el.semester_fee);
            dispatch(getFeesData(originalfees));
            dispatch(getConvertedFeesData(originalfees));
          });

        });
    },[dispatch])

    //merge 2 objects
    useEffect(()=>{
      if(userdata.length!=0 && coursedata.length!=0){
        //merge data
        let mainarray = [];        
        userdata.forEach(user => {
          let obj;
          let arr = [];
          let courseobj = null;
          let jsonstring = "";
          let uniqueData = [];

          coursedata.forEach(course => {
              if(user.id == course.user_id){
                delete course.id;
                arr.push(course);
                uniqueData = [...new Set(arr.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
              }  
          })

          jsonstring = '{"courses":' + JSON.stringify(uniqueData) + '}';
          courseobj = JSON.parse(jsonstring);
          obj = merge(user, courseobj);
          mainarray.push(obj);
        });
      
        setReady(true);
        dispatch(getMergedData(mainarray, mainarray));
      }
    },[userdata, coursedata])
    
    
    return(
        <div>
        
        {/* SEARCH */}
        <SearchComponent/>

        {/* CURRENCY DROPDOWN */}
        <CurrencyComponent/>

        {/* SORTING COMPONENT */}
        <SortingComponent />

        {/* TABLE */}
        <table className="table-fixed w-full border my-6 xs:text-[10px]">
        <thead className='bg-slate-200'>
          <tr className='border'>
            <th className="p-2">
              <div className=" grid grid-cols-2">
                <p className="text-left">Name</p>
              </div>
            </th>
            <th className="p-2">
              <div className=" grid grid-cols-2">
                <p className="text-left">Phone</p>
              </div>
            </th>
            <th className="p-2">
              <div className=" grid grid-cols-2">
                <p className="text-left">Email</p>
              </div>
            </th>
            <th className="p-2">Course Name</th>
            <th className="p-2">Course Selection</th>
            <th className="p-2">Semester</th>
            <th className="p-2">Semester Fee</th>
          </tr>
        </thead>    
        { (mergeddata.length>0) ? (
        <tbody>
          {mergeddata.map( (user, userindex) => 
            <tr className='border' key={userindex}>
              <td className="p-2 border">{(user.name)}</td>
              <td className="p-2 border">{(user.phone)}</td>
              <td className="p-2 border">{(user.email)}</td>
              <td className="p-2 border">
                {(user.courses.length==0) ? (<p>No data found</p>) : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{course.course_name}</p>) : (<p key={courseindex}></p>)
                    )
                  )}
              </td>
              <td className="p-2 border">
                {(user.courses.length==0) ? (<p>No data found</p>) : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{course.course_selection}</p>) : (<p key={courseindex}></p>)
                    )
                  )}
              </td>
              <td className="p-2 border">
                {(user.courses.length==0) ? (<p>No data found</p>) : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{course.semester}</p>) : (<p key={courseindex}></p>)
                    )
                  )}
              </td>
              <td className="p-2 border">
                {(user.courses.length==0) ? (<p>No data found</p>) : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{feessymbol} {convertedfees[courseindex].toFixed(2)}</p>) : (<p key={courseindex}></p>)
                    )
                  )}
              </td>
            </tr>
          )}                                 
        </tbody>) : (
          <tbody>
            <tr><td>No data found.</td></tr>
          </tbody>
        )
        }

      </table>
      </div>
    )

}

export default TableComponent;