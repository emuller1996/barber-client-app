import React, { useEffect, useState } from "react";
import CardAppointment from "../Dashboard/Appointment/CardAppointment";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function MyAppointmentComponent({ id }) {


    const [appointments, setAppointments] = useState(undefined)
    const [pageCount, setPageCount] = useState();
    const [page, setPage] = useState(1);


  useEffect(() => {
    getAppointment();
    return () => {};
  }, [page]);

  const getAppointment = async () => {
    try {
      const result = await axios.get(`/appointment/client/${id}?page=${page}`);
      setAppointments(result.data.docs)
      setPageCount(result.data.totalPages)

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="container">
      <div class="card text-start rounded-0">
        <div class="card-body">
            {
                appointments && appointments.map( a => (<CardAppointment a={a} />))
            }

            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={(e) => setPage(e.selected+1)}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                className="pagination justify-content-center"
                pageClassName="page-item "
                pageLinkClassName="btn btn-secondary rounded-0 text-decoration-none shadow text-white fw-semibold ml-1"
                activeClassName="page-item"
                activeLinkClassName="bg-dark border-dark text-white shadow-sm  rounded"
                previousClassName="page-item"
                nextClassName="page-item "
                previousLinkClassName="btn btn-secondary rounded-0  text-decoration-none shadow text-white fw-semibold mr-1"
                nextLinkClassName="btn btn-secondary rounded-0 text-decoration-none shadow text-white fw-semibold ml-2"
            />
          
        </div>
      </div>
    </div>
  );
}
