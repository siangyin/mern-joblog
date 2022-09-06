import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/style/SearchContainer";
import { FormRow, FormRowSelect } from ".";

const SearchContainer = () => {
	const {
		isLoading,
		search,
		searchStatus,
		searchType,
		sort,
		sortOptions,
		handleChange,
		clearFilters,
		jobTypeOptions,
		statusOptions,
	} = useAppContext();

	const handleSearch = (e) => {
		if (isLoading) return;
		const name = e.target.name;
		const value = e.target.value;
		handleChange({ name, value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		clearFilters();
	};

	return (
		<Wrapper>
			<form className="form">
				<h4>search form</h4>
				<div className="form-center">
					{/* search position */}

					<FormRow
						type="text"
						name="search"
						value={search}
						handleChange={handleSearch}
					/>
					{/* search by status */}
					<FormRowSelect
						labelText="status"
						name="searchStatus"
						value={searchStatus}
						handleChange={handleSearch}
						list={["all", ...statusOptions]}
					/>
					{/* search by type */}
					<FormRowSelect
						labelText="type"
						name="searchType"
						value={searchType}
						handleChange={handleSearch}
						list={["all", ...jobTypeOptions]}
					/>
					{/* sort */}
					<FormRowSelect
						name="sort"
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className="btn btn-block btn-danger"
						disabled={isLoading}
						onClick={handleSubmit}
					>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default SearchContainer;
