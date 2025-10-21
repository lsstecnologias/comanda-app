
const Breadcrumb = () => {

    return (
        <div className="container mt-3 lh-1">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb" >
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
            </nav>
        </div>
    )
}
export default Breadcrumb;