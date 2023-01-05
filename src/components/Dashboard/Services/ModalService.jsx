import React from 'react';
import FormService from './FormServices';

export default function ModalService() {


    return (
        <>

            <div class="modal fade" id="ModalServiceDash" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-cafe rounded-0">
                        <div class="modal-header bg-dark rounded-0">
                            <h5 class="modal-title text-white" id="exampleModalLabel">Crear Servicios</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <FormService />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}