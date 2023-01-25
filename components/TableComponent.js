// import { useDispatch, useSelector } from "react-redux";
// import { getUserData } from "../store/actions/getUserAction";
// import { getCourseData } from "@/store/actions/getCourseAction";
// import { getMergedData } from "@/store/actions/getMergedDataAction";
import { useState, useEffect } from "react";
import {merge} from 'react-merge'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Fuse from "fuse.js";

// components
import SearchComponent from "./Search";
import CurrencyComponent from "./CurrencyDropdown";

const TableComponent = () => {

    // NO REDUX
    const [userdata, setUserData] = useState([]);
    const [coursedata, setUserCourses] = useState([]);
    const [mergeddata, setMergedData] = useState([]);

    const [_mergeddata, _setMergedData] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    
    const [nameSort, setNameSort ] = useState("Descending");
    const [phoneSort, setPhoneSort ] = useState("Descending");
    const [emailSort, setEmailSort ] = useState("Descending");

    const [currencySymbol, setCurrencySymbol] = useState("$");
    const [originalfees, setOriginalFees] = useState([]);
    const [fees, setFees] = useState([]);

    // get users data
    useEffect(()=>{
      axios.get(process.env.USERS_API_URL).then(response => {
        setUserData(response.data);
      });

      axios.get(process.env.USERS_COURSES_API_URL).then(response => {
        setUserCourses(response.data);
        console.log(response.data);
        let feesArr = [];
        response.data.forEach(el => {
          feesArr.push(el.semester_fee);
          setOriginalFees(feesArr);
          setFees(feesArr);
        });
      });
    },[]);


    // WITH REDUX
    // const dispatch = useDispatch();
    // const userListData = useSelector((state) => state.getUserData);
    // const { userdata } = userListData;
    // const courseListData = useSelector((state) => state.getCourseData);
    // const { coursedata } = courseListData;
    // const mergedListData = useSelector((state) => state.getMergedData);
    // const { mergeddata } = mergedListData;

    // // get user and course data
    // useEffect(()=>{
    //     axios.get(process.env.USERS_API_URL).then(response => {
    //         dispatch(getUserData(response.data));
    //     });

    //     axios.get(process.env.USERS_COURSES_API_URL).then(response => {
    //       dispatch(getCourseData(response.data));
    //     });
    // },[dispatch])
    
    // merging json objects
    useEffect(()=>{
      if(userdata.length!=0 && coursedata.length!=0){
        //merge data
        let mainarray = [];
        
        // console.log(coursedata);

        userdata.forEach(user => {
          let obj;
          let arr = [];
          let courseobj = null;
          let jsonstring = "";
          let ctr = 0;
 
          for(let i=0;i<coursedata.length;i++){
            
            if(user.id==1){ 
              if(user.id == coursedata[i].user_id){
                if(arr.length==0){
                  arr.push(coursedata[i]);
                }
                else{
                  for(let j=ctr;j<arr.length;j++){
                    if(arr[j].course_name==coursedata[i].course_name && arr[j].course_selection==coursedata[i].course_selection && arr[j].semester==coursedata[i].semester){
                        break;
                    }
                    else{
                      arr.push(coursedata[i]);
                      ctr+=1;
                      break;
                    }
                  }  
                }
              }  
            }
            else{
              if(user.id == coursedata[i].user_id){
                // arr.push(coursedata[i]);
                if(arr.length==0){
                  arr.push(coursedata[i]);
                }
                else{
                  for(let j=0;j<arr.length;j++){
                    if(arr[j].course_name==coursedata[i].course_name && arr[j].course_selection==coursedata[i].course_selection && arr[j].semester==coursedata[i].semester){
                        break;
                    }
                    else{
                      arr.push(coursedata[i]);
                      break;
                    }
                  }  
                }
              }  
            }
          }          

          jsonstring = '{"courses":' + JSON.stringify(arr) + '}';
          courseobj = JSON.parse(jsonstring);
          obj = merge(user, courseobj);
          mainarray.push(obj);
        });
        setIsReady(true);
        // dispatch(getMergedData(mainarray));
        setMergedData(mainarray);
        _setMergedData(mainarray);
      }
    },[userdata, coursedata])


    //fuzzy search FUSE.js
    const searchQuery = (e) => {
        if(e=="" || e==null){
          setIsFiltered(false);
          _setMergedData(mergeddata);
        }
        else{
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
            keys: ["name","phone","email","courses.course_name","courses.course_selection","courses.semester","courses.semester_fee"]
          };
         
          const searchfuse = new Fuse(mergeddata, searchoptions);
          const searchresult = searchfuse.search(e);
          // console.log(searchresult);
          _setMergedData(searchresult);  
        }
    }
    //


    const toggleNameSort = () => {
      switch(nameSort){
        case "Descending": 
          setNameSort("Ascending");
          sortAscending("name");
          break;
        case "Ascending": 
          setNameSort("Descending");
          sortDescending("name");
          break;
      }
    }

    const togglePhoneSort = () => {
      switch(phoneSort){
        case "Descending": 
          setPhoneSort("Ascending");
          sortAscending("phone");
          break;
        case "Ascending": 
          setPhoneSort("Descending");
          sortDescending("phone");
          break;
      }
    }

    const toggleEmailSort = () => {
      switch(emailSort){
        case "Descending": 
          setEmailSort("Ascending");
          sortAscending("email");
          break;
        case "Ascending": 
          setEmailSort("Descending");
          sortDescending("email");
          break;
      }
    }


    const sortAscending = (sorttype) => {
      switch(sorttype){
        case "name":
          sortByNameAscending();
          break;
        case "phone":
          sortByPhoneAscending();
          break;
        case "email":
          sortByEmailAscending();
          break;
      }
    }

    const sortDescending = (sorttype) => {
      switch(sorttype){
        case "name":
          sortByNameDescending();
          break;
        case "phone":
          sortByPhoneDescending();
          break;
        case "email":
          sortByEmailDescending();
          break;
      }      
    }  
    
    const sortByNameAscending = () => {
      let data = _mergeddata;
      data = data.sort((a, b) => {
        if(isFiltered){
          if (a.item.name < b.item.name) {
            return -1;
          }  
        }
        else{
          if (a.name < b.name) {
            return -1;
          }
        }
      });
    }

    const sortByNameDescending = () => {
      let data = _mergeddata;
      data = data.sort((a, b) => {
        if(isFiltered){
          if (a.item.name > b.item.name) {
            return -1;
          }  
        }
        else{
          if (a.name > b.name) {
            return -1;
          }
        }
      });
    }

    const sortByPhoneAscending = () => {
      let data = _mergeddata;
      data = data.sort((a, b) => {
        if(isFiltered){
          if (a.item.phone < b.item.phone) {
            return -1;
          }  
        }
        else{
          if (a.phone < b.phone) {
            return -1;
          }
        }
      });
    }

    const sortByPhoneDescending = () => {
      let data = _mergeddata;
      data = data.sort((a, b) => {
        if(isFiltered){
          if (a.item.phone > b.item.phone) {
            return -1;
          }  
        }
        else{
          if (a.phone > b.phone) {
            return -1;
          }
        }

      });
    }

    const sortByEmailAscending = () => {
      let data = _mergeddata;
      data = data.sort((a, b) => {
        if(isFiltered){
          if (a.item.email < b.item.email) {
            return -1;
          }  
        }
        else{
          if (a.email < b.email) {
            return -1;
          }
        }
      });
    }

    const sortByEmailDescending = () => {
      let data = _mergeddata;
      data = data.sort((a, b) => {
        if(isFiltered){
          if (a.item.email > b.item.email) {
            return -1;
          }  
        }
        else{
          if (a.email > b.email) {
            return -1;
          }
        }
      });
    }

    // CURRENCY CONVERTER
    const convertCurrency = (currency, symbol) => {
      setCurrencySymbol(symbol);     
      //convert all semester fees
      let convertArr = [];
      originalfees.forEach(el => {
        let convertedvalue = el*currency.conversion_rate;
        convertArr.push(convertedvalue);
        setFees(convertArr);
      });
    }
    //
    
    return(
        <div>
        
        {/* SEARCH */}
        <div>
          <SearchComponent searchQuery={searchQuery}/>
        </div>

        {/* CURRENCY DROPDOWN */}
        <div>
          <CurrencyComponent convertCurrency={convertCurrency}/>
        </div>

        {/* TABLE */}
        <table className="table-fixed w-full border my-6 xs:text-[10px]">
        <thead className='bg-slate-200'>
          <tr className='border'>
            <th className="p-2">
              <div className=" grid grid-cols-2">
                <p className="text-left">Name</p>
                <div className="text-right cursor-pointer" onClick={()=>toggleNameSort()}>
                  {(nameSort=="Ascending") ? (<FontAwesomeIcon icon={faArrowUp}/>) : (<FontAwesomeIcon icon={faArrowDown}/>) }           
                </div>
              </div>
            </th>
            <th className="p-2">
              <div className=" grid grid-cols-2">
                <p className="text-left">Phone</p>
                <div className="text-right cursor-pointer" onClick={()=>togglePhoneSort()}>
                  {(phoneSort=="Ascending") ? (<FontAwesomeIcon icon={faArrowUp}/>) : (<FontAwesomeIcon icon={faArrowDown}/>) }           
                </div>
              </div>
            </th>
            <th className="p-2">
              <div className=" grid grid-cols-2">
                <p className="text-left">Email</p>
                <div className="text-right cursor-pointer" onClick={()=>toggleEmailSort()}>
                  {(emailSort=="Ascending") ? (<FontAwesomeIcon icon={faArrowUp}/>) : (<FontAwesomeIcon icon={faArrowDown}/>) }           
                </div>
              </div>
            </th>
            <th className="p-2">Course Name</th>
            <th className="p-2">Course Selection</th>
            <th className="p-2">Semester</th>
            <th className="p-2">Semester Fee</th>
          </tr>
        </thead>    
        { (isReady && _mergeddata.length>0) ? (
        <tbody>
          {_mergeddata.map( (user, userindex) => 
            <tr className='border' key={userindex}>
              <td className="p-2 border">{(isFiltered) ? (user.item.name) : (user.name)}</td>
              <td className="p-2 border">{(isFiltered) ? (user.item.phone) : (user.phone)}</td>
              <td className="p-2 border">{(isFiltered) ? (user.item.email) : (user.email)}</td>
              <td className="p-2 border">
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
              <td className="p-2 border">
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
              <td className="p-2 border">
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
              <td className="p-2 border">
                {
                (isFiltered)
                ?
                (
                  (user.item.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.item.courses.map( (course, courseindex) => 
                      (user.item.id==course.user_id) ? (<p key={courseindex}>{currencySymbol} {fees[courseindex].toFixed(2)}</p>) : (<p key={courseindex}></p>)
                    )
                  )
                )
                :
                (
                  (user.courses.length==0) ? (<p>No data found</p>) 
                  : 
                  (
                    user.courses.map( (course, courseindex) => 
                      (user.id==course.user_id) ? (<p key={courseindex}>{currencySymbol} {fees[courseindex].toFixed(2)}</p>) : (<p key={courseindex}></p>)
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