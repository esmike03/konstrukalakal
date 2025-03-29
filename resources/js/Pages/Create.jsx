import { useForm, Head, usePage } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        body: "",
    });
    const { component } = usePage();

    function submit(e) {
        e.preventDefault();
        post("/posts");
    }

    return (
        <>
            <Head title={component}/>
            <h1 className="text-lg font-bold text-center mt-10">Create a new post</h1>
            {errors.body && <p className="text-center text-red-500">{errors.body}</p>}
            <div className="w-1/2 mx-auto mt-4 ">
                <form onSubmit={submit}>
                <textarea
                rows="10"
                value={data.body}
                onChange={(e) => setData("body", e.target.value)}
                className={`block w-full p-1 border rounded-md ${errors.body ? 'ring ring-red-500' : ''}`}
            ></textarea>

            <button
                className={`w-full p-2 rounded-md text-white mt-4
                            ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
                disabled={processing}>
                {processing ? "Creating..." : "Create Post"}
            </button>

                </form>
            </div>

        </>
    );
}
