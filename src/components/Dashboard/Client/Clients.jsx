import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

export default function Client() {




    const [clients, setClients] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [pageCount, setPageCount] = useState();




    useEffect(() => {
        getAllClient(page, limit);
    }, [page, limit])


    const getAllClient = async (page, limit) => {

        try {
            const result = await axios.get(`/client?page=${page}&limit=${limit}`);
            console.log(result.data);
            setClients(result.data.clients.docs)
            setPageCount(result.data.clients.totalPages)
        } catch (error) {

        }





    }

    return (
        <>


            <p>Lista de Clientes</p>

            <table class="table table-hover table-striped m-0 p-0">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Numero Telefonico</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Edad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients ? clients.map(c => (
                            <tr>
                                <th scope="row">{c.phoneNumber}</th>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.age}</td>
                            </tr>
                        ))
                            : (
                                <p>Cargando . .</p>
                            )}


                </tbody>
            </table>

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
                activeLinkClassName="bg-danger border-danger text-white shadow-sm "
                previousClassName="page-item"
                nextClassName="page-item "
                previousLinkClassName="btn btn-secondary rounded-0  text-decoration-none shadow text-white fw-semibold mr-1"
                nextLinkClassName="btn btn-secondary rounded-0 text-decoration-none shadow text-white fw-semibold ml-2"
            />
            {/* <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                        <a class="page-link">Previous</a>
                    </li>
                    <li class="page-item "><a class="page-link " href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav> */}


        </>
    )
}