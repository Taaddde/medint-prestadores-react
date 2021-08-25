export const getCurrentMonthAndYear = () => {
    const date = new Date();
    const today = date.toISOString().slice(0,7);
    return today;
}

export const getPreviousMonthAndYear = () => {
    const date = new Date();
    let month = date.getMonth();
    const year = date.getFullYear();

    if(month < 10)  month = `0${month}`;
    

    return `${year}-${month}`
}

export const getMonthAndYear = (date) => {

    const fecha = date.split('-');
    fecha[1] = getMonth(fecha[1]);

    console.log(fecha);

    return fecha;
}

export const getMonth = (month) => {

    switch (month) {
        case '01' || '1':
            return 'Enero';

        case '02' || '2':
            return 'Febrero';

        case '03' || '3':
            return 'Marzo';

        case '04' || '4':
            return 'Abril';

        case '05' || '5':
            return 'Mayo';

        case '06' || '6':
            return 'Junio';

        case '07' || '7':
            return 'Julio';

        case '08' || '8':
            return 'Agosto';

        case '09' || '9':
            return 'Septiembre';

        case '10':
            return 'Octubre';

        case '11':
            return 'Noviembre';

        case '12':
            return 'Diciembre';

        default: 
            return false;
            
    }

}

export const castDates = (sesiones) => {
    sesiones.forEach(sesion => {
        const desde = new Date(sesion.fecha_desde);
        sesion.fecha_desde = `${desde.getDate()}/${desde.getMonth()+1}/${desde.getFullYear()}`;

        const hasta = new Date(sesion.fecha_hasta);
        sesion.fecha_hasta = `${hasta.getDate()}/${hasta.getMonth()+1}/${hasta.getFullYear()}`;
    });
}

export const castFechayHora = (datos) => {
    if(datos){
        datos.forEach(dato => {
            dato.fechadecarga = dato.fechadecarga.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
        });
    }
}

export const castDatesDocumentos = (documentos) => {
    
    documentos.forEach(documento => {
        documento.desde = documento.desde.substr(0,10);
        documento.desde = documento.desde.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');

        documento.hasta = documento.hasta.substr(0,10);
        documento.hasta = documento.hasta.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    });

    
}