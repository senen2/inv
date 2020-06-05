import datetime

fecha = '2019-02-18'
print("date", fecha)

fechad = datetime.datetime.strptime(fecha,'%Y-%m-%d')

#one year
desde = str(fechad.replace(month=1).replace(day=1)).split(' ')[0]
hasta = str(fechad.replace(month=1).replace(day=1).replace(year=fechad.year+1)).split(' ')[0]
print("year", desde, hasta)

#one day
desde = str(fechad).split(' ')[0]
hasta = str((fechad + datetime.timedelta(days=1))).split(' ')[0]
print("day", desde, hasta)

#one month
desde = datetime.datetime(fechad.year, fechad.month, 1)
hasta = str(datetime.datetime(desde.year + int(desde.month / 12), ((desde.month % 12) + 1), 1)).split(' ')[0]
desde = str(desde).split(' ')[0]
print("month", desde, hasta)
