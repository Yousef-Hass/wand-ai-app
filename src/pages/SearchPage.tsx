import ErrorBoundary from '../components/ErrorBoundary';
import SearchView from '../components/SearchView';

interface SearchPageProps {
	className?: string;
}

const SearchPage = ({ className = '' }: SearchPageProps) => {
	return (
		<ErrorBoundary>
			<SearchView className={className} />
		</ErrorBoundary>
	);
};

export default SearchPage;
