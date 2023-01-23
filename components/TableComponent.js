import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../store/actions/getUserAction";
import { getCourseData } from "@/store/actions/getCourseAction";
import { getMergedData } from "@/store/actions/getMergedDataAction";
import { useState, useEffect } from "react";
import {merge} from 'react-merge'
import axios from "axios";
import Fuse from "fuse.js";

import SearchComponent from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";

const TableComponent = () => {

    // NO REDUX
    // const [userData, setUserData] = useState([]);
    // const [userCourses, setUserCourses] = useState([]);

    // // get users data
    // useEffect(()=>{
    //   loadData();
    // },[]);

    // const loadData = () => {
    //   axios.get(process.env.USERS_API_URL).then(response => {
    //     console.log(response.data);
    //       setUserData(response.data);
    //   });

    //   axios.get(process.env.USERS_COURSES_API_URL).then(response => {
    //     console.log(response.data);
    //     setUserCourses(response.data);
    //   });
    // }

    const dispatch = useDispatch();
    const userListData = useSelector((state) => state.getUserData);
    const { userdata } = userListData;
    const courseListData = useSelector((state) => state.getCourseData);
    const { coursedata } = courseListData;
    const mergedListData = useSelector((state) => state.getMergedData);
    const { mergeddata } = mergedListData;

    const [_mergeddata, setMergedData] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    // get user and course data
    useEffect(()=>{
        // loadData();
        axios.get(process.env.USERS_API_URL).then(response => {
            dispatch(getUserData(response.data));
        });

        axios.get(process.env.USERS_COURSES_API_URL).then(response => {
          dispatch(getCourseData(response.data));
          // console.log(response.data);
        });
    },[dispatch])
    

    useEffect(()=>{
      if(userdata.length!=0 && coursedata.length!=0){
        //merge data
        let mainarray = [];
 
        userdata.forEach(user => {
          let obj;
          let arr = [];
          let courseobj = null;
          let jsonstring = "";
          coursedata.forEach(course => {
            if(user.id==course.user_id){
              
              if(arr.length==0){
                arr.push(course);
              }
              else{
                for(let i=0;i<arr.length;i++){
                  if(arr[i].course_name==course.course_name && arr[i].course_selection==course.course_selection && arr[i].semester==course.semester){
                    break;
                  }
                  else{
                    arr.push(course);
                    break;
                  }
                }
              }
            }
          });

          jsonstring = '{"courses":' + JSON.stringify(arr) + '}';
          courseobj = JSON.parse(jsonstring);
          obj = merge(user, courseobj);
          mainarray.push(obj);
        });
        setIsReady(true);
        dispatch(getMergedData(mainarray));
        setMergedData(mainarray);
      }
    },[userdata, coursedata, dispatch])


    // const loadData = () => {
    //     axios.get(process.env.USERS_API_URL).then(response => {
    //         dispatch(getUserData(response.data));
    //     });

    //     axios.get(process.env.USERS_COURSES_API_URL).then(response => {
    //       dispatch(getCourseData(response.data));
    //       console.log(response.data);
    //     });
    // }
    //


    //search data
    const searchQuery = (e) => {
        setIsFiltered(true);
        const searchoptions = {
          isCaseSensitive: true,
          includeScore: true,
          // shouldSort: true,
          // includeMatches: false,
          // findAllMatches: false,
          minMatchCharLength: 3,
          // location: 0,
          // threshold: 0.6,
          // distance: 1000,
          // useExtendedSearch: true,  
          // ignoreLocation: false,
          // ignoreFieldNorm: true,
          // fieldNormWeight: 1,
          // keys: ["name","email","phone", "courses","course_name", "course_selection","semester"],
          keys: ["name","phone","email","courses.course_name","courses.course_selection","courses.semester","courses.semester_fee"]
        };
       
        const searchfuse = new Fuse(mergeddata, searchoptions);
        const searchresult = searchfuse.search(e);
        console.log(searchresult);
        setMergedData(searchresult);
    }
    //
    
    return(
        <div>
        <div>
          <SearchComponent searchQuery={searchQuery}/>
        </div>
        <table className="table-fixed w-full border my-6">
        <thead className='bg-slate-200'>
          <tr className='border'>
            <th className="p-2 w-2/7">
              <div className=" grid grid-cols-2">
                <p className="text-left">Name</p>
                <div className="text-right cursor-pointer">
                  <FontAwesomeIcon
                    icon={faArrowDown}
                  />
                </div>
              </div>
            </th>
            <th className="p-2 w-2/7">
              <div className=" grid grid-cols-2">
                <p className="text-left">Phone</p>
                <div className="text-right cursor-pointer">
                  <FontAwesomeIcon
                    icon={faArrowDown}
                  />
                </div>
              </div>
            </th>
            <th className="p-2 w-2/7">
              <div className=" grid grid-cols-2">
                <p className="text-left">Email</p>
                <div className="text-right cursor-pointer">
                  <FontAwesomeIcon
                    icon={faArrowDown}
                  />
                </div>
              </div>
            </th>
            <th className="p-2 w-2/7">Course Name</th>
            <th className="p-2 w-2/7">Course Selection</th>
            <th className="p-2 w-2/7">Semester</th>
            <th className="p-2 w-2/7">Semester Fee</th>
          </tr>
        </thead>    
        { (isReady && _mergeddata.length>0) ? (
        <tbody>
          {_mergeddata.map( (user, userindex) => 
            <tr className='border' key={userindex}>
              <td className="p-2 border text-sm">{(isFiltered) ? (user.item.name) : (user.name)}</td>
              <td className="p-2 border text-sm">{(isFiltered) ? (user.item.phone) : (user.phone)}</td>
              <td className="p-2 border text-sm">{(isFiltered) ? (user.item.email) : (user.email)}</td>
              <td className="p-2 border text-sm">
                {
                (isFiltered)
                ?
                (
                  (user.item.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.item.courses.map( (course, courseindex) => 
                      (user.item.id==course.user_id) ? (<p key={courseindex}>{course.course_name}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                :
                (
                  (user.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{course.course_name}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                }
              </td>
              <td className="p-2 border text-sm">
                {
                (isFiltered)
                ?
                (
                  (user.item.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.item.courses.map( (course, courseindex) => 
                      (user.item.id==course.user_id) ? (<p key={courseindex}>{course.course_selection}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                :
                (
                  (user.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{course.course_selection}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                }
              </td>
              <td className="p-2 border text-sm">
                {
                (isFiltered)
                ?
                (
                  (user.item.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.item.courses.map( (course, courseindex) => 
                      (user.item.id==course.user_id) ? (<p key={courseindex}>{course.semester}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                :
                (
                  (user.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{course.semester}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                }
              </td>
              <td className="p-2 border text-sm">
                {
                (isFiltered)
                ?
                (
                  (user.item.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.item.courses.map( (course, courseindex) => 
                      (user.item.id==course.user_id) ? (<p key={courseindex}>$ {course.semester_fee}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                :
                (
                  (user.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>$ {course.semester_fee}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                }
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