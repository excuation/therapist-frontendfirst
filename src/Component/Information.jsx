const Information = ({ item }) => {
    if (!item || !item.name) {
        return <div>Data is unavailable</div>;
    }

    return (
        <div>
            <h3>{item.name}</h3>
            <p>{item.specialty || 'Specialty not available'}</p>
            {/* Render other relevant fields */}
        </div>
    );
};

export default Information;
