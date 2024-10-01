import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { BarController, BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { jsPDF } from 'jspdf';

// Register Chart.js components
ChartJS.register(ArcElement, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartCreator = () => {
    const [chartType, setChartType] = useState('pie');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [dataPoints, setDataPoints] = useState([]);
    const [labels, setLabels] = useState([]);
    const [numParts, setNumParts] = useState(0);

    const handleNumPartsChange = (e) => {
        setNumParts(Number(e.target.value));
        setDataPoints(Array(Number(e.target.value)).fill(0)); // Reset data points
        setLabels(Array(Number(e.target.value)).fill('')); // Reset labels
    };

    const handleDataChange = (index, value) => {
        const newDataPoints = [...dataPoints];
        newDataPoints[index] = Number(value); // Ensure value is a number
        setDataPoints(newDataPoints);
    };

    const handleLabelChange = (index, value) => {
        const newLabels = [...labels];
        newLabels[index] = value;
        setLabels(newLabels);
    };

    const createChart = () => {
        if (dataPoints.length !== numParts || labels.length !== numParts) {
            alert(`Please provide ${numParts} data points and labels.`);
            return;
        }
    };

    const downloadChart = () => {
        const canvas = document.getElementById('chart');
        const image = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF();
        
        // Add heading
        pdf.setFontSize(20);
        pdf.text(heading, 15, 20);
        
        // Add description
        pdf.setFontSize(12);
        pdf.text(description, 15, 30);
        
        // Add chart image
        pdf.addImage(image, 'JPEG', 15, 40, 180, 160);
        
        // Save PDF
        pdf.save(`${heading}.pdf`);
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: heading,
                data: dataPoints,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create Chart</h2>
            <input
                type="text"
                placeholder="Heading (e.g., Sales Report)"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                style={styles.input}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
            />
            <select value={chartType} onChange={(e) => setChartType(e.target.value)} style={styles.select}>
                <option value="pie">Pie Chart</option>
                <option value="bar">Bar Graph</option>
            </select>
            <input
                type="number"
                placeholder="How many parts do you want?"
                value={numParts}
                onChange={handleNumPartsChange}
                style={styles.input}
            />
            {Array.from({ length: numParts }, (_, index) => (
                <div key={index} style={styles.dataInputContainer}>
                    <input
                        type="text"
                        placeholder={`Label for part ${index + 1}`}
                        onChange={(e) => handleLabelChange(index, e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder={`Data for part ${index + 1}`}
                        onChange={(e) => handleDataChange(index, e.target.value)}
                        style={styles.input}
                    />
                </div>
            ))}
            <div style={styles.buttonContainer}>
                <button onClick={createChart} style={styles.button}>Create Chart</button>
                <button onClick={downloadChart} style={styles.button}>Download Chart as PDF</button>
            </div>
            {dataPoints.length > 0 && labels.length > 0 && (
                chartType === 'pie' ? <Pie id="chart" data={chartData} /> : <Bar id="chart" data={chartData} />
            )}
        </div>
    );
};

// Styles
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        height: '60px',
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    select: {
        width: '100%',
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    dataInputContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default ChartCreator;
