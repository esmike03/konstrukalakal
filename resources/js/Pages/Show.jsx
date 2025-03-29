import {useForm, Link } from "@inertiajs/react";

export default function Show({post}) {
    const { delete: destroy } = useForm();

    function submit(e) {
        e.preventDefault()
        destroy(`/posts/${post.id}`)
    }

    return (
        <>
            <h1 className="font-bold text-center mt-10">Post {post.id}</h1>
            <p className="mt-10 text-justify mx-4">{post.body}</p>
            <div className="flex items-center justify-end gap-2">
                <form onSubmit={submit}>
                    <button className="hover: cursor-pointer bg-red-500 text-white p-1 px-2 rounded-md m-2 font-medium">Delete</button>
                </form>
                <Link href={`/posts/${post.id}/edit`} className="bg-green-500 text-white p-1 px-2 rounded-md m-2 font-medium">Update</Link>
            </div>
        </>
    )
}
