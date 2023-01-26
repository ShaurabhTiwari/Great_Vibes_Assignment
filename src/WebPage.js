import {useState, useEffect} from "react";
import axios from "axios";
import IndividualCard from "./IndividualCard";
import ReactPaginate from "react-paginate";



const NewsPage = () => {
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [searchOn, setSearch] = useState(false);
    const [filter1, setfil1] = useState("Popularity");
    const [filter2, setfil2] = useState("1");
    const [currentPage, setCurrentPage] = useState(0);
    const [articles, setArticles] = useState ([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = Event => {
        console.log(Event);
        setCurrentPage(Event.selected);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setCurrentPage(0);
        setQuery(searchInput);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    "https://hn.algolia.com/api/v1/search?",
                    {
                        params: {page: currentPage, query},
                    }
                    ) ;
                const { hits, nbPages} = data;
                setArticles(hits);
                setTotalPages(nbPages);
                console.log(data);
            } catch (err) {
                console.log(err) ;
            } finally {
                setIsLoading(false);
            }

        };
        fetchData();
    },[currentPage, query]);

    const handleChange0 = () => {
        console.log("Handled")
    }
    const handleChange1 = () => {
        // console.log(sortVal);
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    "https://hn.algolia.com/api/v1/search?",
                    {
                        params: {page: currentPage, query},
                    }
                    ) ;
                const { hits, nbPages} = data;
                setArticles(hits);
                setTotalPages(nbPages);
                console.log(data);
            } catch (err) {
                console.log(err) ;
            } finally {
                setIsLoading(false);
            }

        };
        const fetchData2 = async () => {
            try {
                const { data } = await axios.get(
                    "http://hn.algolia.com/api/v1/search_by_date",
                    {
                        params: {page: currentPage, query},
                    }
                    ) ;
                const { hits, nbPages} = data;
                setArticles(hits);
                setTotalPages(nbPages);
                console.log(data);
            } catch (err) {
                console.log(err) ;
            } finally {
                setIsLoading(false);
            }

        };
        if(filter1 === "Date")fetchData2();
        else fetchData();
    }

    const handleChange2 = () => {

    }
    
    const onOptionChangeHandler=async(event)=>{
        
            setfil1(event.target.value)
            await handleChange1();
        
    }
    const onOptionChangeHandler1 = async(event)=>{
        setfil2(event.target.value);
        await handleChange0();
    }
    const onOptionChangeHandler0 = async(event)=>{
        console.log("Changed");
        await handleChange0();
    }
    const filter = () => {
        let value1 = "Popularity";
        let value2 = "1";
        let value0 = "Stories";
        const options0 = ['All', 'Stories', 'Comments'];
        const options = ['Popularity','Date'];
        const options1 = ['All Time', 'Last 24 Hours', 'Past Week', 'Past Month', 'Past Year'];
        return(
            <div>
                <label>Search</label>
                <select onChange = {onOptionChangeHandler0}>
                    {
                        options0.map((option, index)=>{
                            return <option key={index}>
                                {option}
                            </option>
                        })
                    }
                </select>
                by
                <select onChange={onOptionChangeHandler}>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                </select>
                for
                <select onChange = {onOptionChangeHandler1}>
                    {
                        options1.map((option, index) => {
                            return <option key={index}>{option}</option>
                        })
                    }
                </select>
            </div>
        )
        //     <div>
        //         <label>
                
        //             Search 
        //             <select value={value0} onChange={handleChange0}>
        //                 <option value="All">All</option>
        //                 <option value="Stories">Stories</option>
        //                 <option value="Comments">Comments</option>
        //             </select>
        //             By
        //             <select value = {this.value} onChange={setfil1(this.value) && handleChange1}>
        //                 <option value="Popularity">Popularity</option>
        //                 <option value="Date">Date</option>
        //             </select>
        //             for
        //             <select value = {this.value} onChange={setfil2(this.value) && handleChange2}>
        //                 <option value="1">All time</option>
        //                 <option value="2">Last 24 Hours</option>
        //                 <option value="3">Past Week</option>
        //                 <option value="4">Past Month</option>
        //                 <option value="5">Past Year</option>
        //             </select>
        //         </label>
        //     </div>
        // );
    }

    return(
        <div className="container">
            <h1>Hacker News</h1>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    placeholder = "Search for the news"
                    value = {searchInput}
                    onChange = {event => setSearchInput(event.target.value)}
                 />
                <button className="searchbtn" type = "submit" onClick = {() => setSearch(true)}> Search </button>
            </form>


            <div className = "news-container" >
                {
                    searchOn ? filter() : " "
                }
                {
                    isLoading? <p>Loading....</p> : articles.map( article => <IndividualCard article={article} key = {article.objectID}/>)
                    
                }
            </div>
            <ReactPaginate 
                nextLabel = ">>"
                previousLabel = "<<"
                breakLabel = "..."
                forcePage={currentPage}
                pageCount = {totalPages}
                renderOnZeroPageCount = {null}
                onPageChange = {handlePageChange}
                className = "pagination"
                activeClassName="active-page"
                previousClassName="previous-page"
                nextClassName="next-page"

            />
        </div>
    );
};
export default NewsPage;
