import '../App.css';

function WeatherModule(props) {
    return(
        <div className='weather-table'>
            <table>
                <thead>
                </thead>
                <tbody>
                <tr>
                    <td>Aktualna pogoda dla </td>
                    <td>{props.cityWeather.name}</td>
                </tr>
                <tr>
                    <td>Zachmurzenie</td>
                    <td>{props.cityWeather.clouds.all}%</td>
                </tr>
                <tr>
                    <td>Temperatura</td>
                    <td>{Math.round(props.cityWeather.main.temp-273)} &#176;C</td>
                </tr>
                <tr>
                    <td>Temperatura odczuwalna</td>
                    <td>{Math.round(props.cityWeather.main.feels_like-273)} &#176;C</td>
                </tr>
                
                <tr>
                    <td>Ciśnienie</td>
                    <td>{props.cityWeather.main.pressure} hPa</td>
                </tr>
                <tr>
                    <td>Wilgotność</td>
                    <td>{props.cityWeather.main.humidity}%</td>
                </tr>
                <tr>
                    <td>Prędkość wiatru</td>
                    <td>{Math.round(props.cityWeather.wind.speed)} km/h</td>
                </tr>
            </tbody>
            </table>
        </div>
    )

}

export default WeatherModule;
