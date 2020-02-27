import React, { useState, useContext } from 'react'
import { editPost, getAllPosts, editPostChangeField, editPostCancel, changeTotalSum } from '../../actions/actionCreators';
import PostContext from '../../contexts/Contexts';
import Loader from '../Loader/Loader';

export default function EditPostForm() {
    const { state, dispatch } = useContext(PostContext);
    const { editedPost: { item, loading, error } } = state;

    let currentPrice = 0;

    async function handleSave(evt) {
        evt.preventDefault();
        try {
            await editPost(dispatch, item);
            await getAllPosts(dispatch);
            const arr = state.posts.items.find(o => o.id === item.id);
            currentPrice = parseInt(arr.price, 10);
            dispatch(changeTotalSum(currentPrice, parseInt(item.price, 10)));
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = evt => {
        const { target: { name, value } } = evt;
        dispatch(editPostChangeField(name, value));
    };

    function handleCancel() {
        dispatch(editPostCancel());
    }

    function getFooter() {
        if (loading) {
            return (
                <Loader />
            )
        }
        if (error) {
            return (
                <>
                    <span>Error occured</span>
                    <button>Retry</button>
                    <button type="reset">Cancel</button>
                </>
            )
        }
        return (
            <>
                <button className="btn btn-success">{item.id === 0 ? 'Add' : 'Save'}</button>
                <button class="btn btn-danger" type="reset">cancel</button>
            </>
        )
    }

    return (
        <form onSubmit={handleSave} onReset={handleCancel}>


            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Price:</span>
                </div>
                <input name="price" type="text" class="form-control col-3" placeholder="Price" onChange={handleChange} value={item.price} aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Category</label>
                </div>
                <select class="custom-select col-2" name="category" id="category" onChange={handleChange} value={item.category}>
                    <option selected>Choose...</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Beauty">Beauty</option>
                </select>
            </div>



            <div class="input-group mb-3">
                <div class="input-group-prepend ">
                    <span class="input-group-text">Description</span>
                </div>
                <textarea name="description" placeholder="description" value={item.description} onChange={handleChange} class="form-control col-5" aria-label="With textarea"></textarea>
            </div>


            {getFooter()}
        </form>
    )
}
