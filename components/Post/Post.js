import React, { useState, useContext } from 'react'
import PostContext from '../../contexts/Contexts'
import { removePostById, editExistingPost, removePostFirst, removePostCancel, getAllPosts, addToTotalSum, subtractFromTotalSum, showDescription } from '../../actions/actionCreators';
import Loader from '../Loader/Loader';
import { useEffect } from 'react';

export default function Post({ item }) {
    const { state: { removedPost, description }, dispatch } = useContext(PostContext);
    useEffect(() => {
        dispatch(addToTotalSum(parseInt(item.price, 10)));
    }, []);

    async function handleProcess(evt) {
        evt.preventDefault();
        try {
            await removePostById(dispatch, item.id);
            await getAllPosts(dispatch);
            dispatch(subtractFromTotalSum(parseInt(item.price, 10)));
        } catch (e) {
            console.log(e);
        }
    }

    function handleRemove(evt) {
        evt.preventDefault();
        dispatch(removePostFirst(item.id));
    }

    function handleCancel(evt) {
        evt.preventDefault();
        dispatch(removePostCancel());
    }

    function handleEdit(evt) {
        evt.preventDefault();
        dispatch(editExistingPost(item));
    }

    async function handleDesc(evt) {
        evt.preventDefault();
        try {
            await showDescription(dispatch, item.id);
            await getAllPosts(dispatch);
        } catch (e) {
            // console.log(e);
        }
    }

    function getFooter() {
        if (removedPost.loading) {
            return <Loader />;
        }
        if (removedPost.id !== item.id) {
            return (
                <div>
                    <button class="btn btn-success" href="" onClick={handleEdit}>edit</button>
                    <button class="btn btn-danger" href="" onClick={handleRemove}>delete</button>
                </div>
            );
        }
        if (removedPost.error) {
            return (
                <div>
                    <p>Error occured. Retry?</p>
                    <button class="btn btn-success" href="" onClick={handleProcess}>Yes</button>
                    <button class="btn btn-danger" href="" onClick={handleCancel}>No</button>
                </div>
            );
        }
        return (
            <div>
                Are you sure, you want to delete this post?
                <button class="btn btn-success" href="" onClick={handleProcess}>Yes</button>
                <button class="btn btn-danger" href="" onClick={handleCancel}>No</button>
            </div>
        );
    }
    function getDesc() {
        return (<div class="card">
            <div class="card-body">
                {description.value}
            </div>
        </div>)
    }
    return (
        <div className="card text-center col-5" >  
        {getFooter()}
            <div class="card-header">
                 <p>Category: {item.category}</p>
                    </div>
            <p>Price: {item.price}</p>
           
            <button class="btn btn-info" o  nClick={handleDesc}>Show Description</button>
            {description.loading && <Loader />}
            {item.id === description.id && getDesc()}
        </div>
    )
}
