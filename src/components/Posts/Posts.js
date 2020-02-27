import React, { useContext, useEffect } from 'react'
import PostContext from '../../contexts/Contexts'
import Post from '../Post/Post';
import { getAllPosts } from '../../actions/actionCreators';
import Loader from '../Loader/Loader';

export default function Posts() {
    const { state, dispatch } = useContext(PostContext);

    const { posts: { items, loading, error } } = state;

    async function handleRetry() {
        try {
            await getAllPosts(dispatch);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        (async function () {
            try {
                await getAllPosts(dispatch);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [dispatch]);

    const errorEl = (
        <>
            <p>Error occured</p>
            <button onClick={handleRetry}>retry</button>
        </>
    );

    return (
        <div>
            {loading && <Loader />}
            {items.map(o => <Post key={o.id} item={o} />)}
            <span>total sum: </span>{state.totalSum}
            {error && errorEl}
        </div>
    )
}
