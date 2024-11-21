import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState('');
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');

    const handleCrawl = async () => {
        setError('');
        setLoading(true);
        setReport('');
        setSummary('');
        
        console.log('Requesting crawl for:', url);
        try {
            const response = await axios.post('http://localhost:3000/crawl', { baseURL: url });
            console.log('Received response:', response);
            setReport(response.data.report);
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            {/* Search Section */}
            <div style={styles.searchContainer}>
                <h1 style={styles.heading}>Web Crawler</h1>
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Enter website URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={styles.input}
                    />
                    <button
                        onClick={handleCrawl}
                        style={styles.button}
                    >
                        Start Crawl
                    </button>
                </div>
            </div>

            {/* Loading and Error Message */}
            <div style={styles.loadingErrorContainer}>
                {loading && <p style={styles.loading}>Loading...</p>}
                {error && <p style={styles.error}>{error}</p>}
            </div>

            {/* Crawl Results */}
            <div style={styles.resultsContainer}>
                {/* Full Report */}
                {report && (
                    <div style={styles.reportContainer}>
                        <h2>Full Crawl Report</h2>
                        <pre style={styles.report}>{report}</pre>
                    </div>
                )}

                {/* Crawl Summary */}
                {summary && (
                    <div style={styles.summaryContainer}>
                        <h2>Crawl Summary</h2>
                        <pre style={styles.report}>{summary}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '100%',
        height: '100vh',
        backgroundColor: 'rgba(173, 216, 230, 0.4)', // Lighter blue background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backdropFilter: 'blur(6px)', // Applying blur effect
        overflow: 'auto',
    },
    searchContainer: {
        textAlign: 'center',
        marginBottom: '20px', // Space between search section and results
    },
    heading: {
        color: '#ffffff',
        fontSize: '3rem', // Larger font size for emphasis
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow for better visibility
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px',
    },
    input: {
        padding: '12px',
        width: '70%',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginRight: '15px',
        fontSize: '1.2rem',
    },
    button: {
        padding: '12px 25px',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
    },
    loadingErrorContainer: {
        textAlign: 'center',
        marginBottom: '20px', // Space between loading/error message and results
    },
    loading: {
        fontSize: '1.2rem',
        color: '#000',
    },
    error: {
        color: 'red',
        fontSize: '1.2rem',
    },
    resultsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: '40px', // Add space between the search section and the results
    },
    reportContainer: {
        width: '48%',
        background: '#f4f4f4',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    summaryContainer: {
        width: '48%',
        background: '#e8f5e9',
        padding: '15px',
        borderRadius: '5px',
    },
    report: {
        whiteSpace: 'pre-wrap',
        background: '#f4f4f4',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '10px',
        overflowX: 'auto',
    }
};

export default App;
