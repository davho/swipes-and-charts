import React from 'react'
import { ScrollView, Text } from 'react-native'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit'
import { data, contributionData, pieChartData, progressChartData } from '../data/dummy-charts-data'

import config from '../config'

const ChartsScreen = () => {

    const width = config.screenWidth
    const height = 220

    return (
        <ScrollView
            key={Math.random()}
            style={{backgroundColor: 'rgb(0,0,0)'}}>

            <Text style={labelStyle}>Bezier Line Chart</Text>
            <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                bezier
                style={graphStyle}
            />

            <Text style={labelStyle}>Progress Chart</Text>
            <ProgressChart
                data={progressChartData}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
            />

            <Text style={labelStyle}>Bar Graph</Text>
            <BarChart
                width={width}
                height={height}
                data={data}
                chartConfig={chartConfig}
                style={graphStyle}
            />

            <Text style={labelStyle}>Pie Chart</Text>
            <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
            />

            <Text style={labelStyle}>Line Chart</Text>
            <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
            />

            <Text style={labelStyle}>Contribution Graph</Text>
            <ContributionGraph
                values={contributionData}
                width={width}
                height={height}
                endDate={new Date('2016-05-01')}
                numDays={105}
                chartConfig={chartConfig}
                style={graphStyle}
            />

        </ScrollView>
    )
}

//The below cannot be rendered in a StyleSheet because it takes properties that don't work with StyleSheet

const graphStyle = {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {borderRadius: 16}
    }
const chartConfig = {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {borderRadius: 16}
    }
const labelStyle = {
        color: chartConfig.color(),
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 16
    }

export default ChartsScreen
