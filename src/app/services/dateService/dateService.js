

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

export const castDates = (sesiones) => {
    sesiones.forEach(sesion => {
        const desde = new Date(sesion.fecha_desde);
        sesion.fecha_desde = `${desde.getDate()}/${desde.getMonth()+1}/${desde.getFullYear()}`;

        const hasta = new Date(sesion.fecha_hasta);
        sesion.fecha_hasta = `${hasta.getDate()}/${hasta.getMonth()+1}/${hasta.getFullYear()}`;
    });
}

export const castFechayHora = (datos) => {
    datos.map(dato => {
        dato.fechadecarga = dato.fechadecarga.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    });
}

export const castDatesDocumentos = (documentos) => {
    
    documentos.forEach(documento => {
        documento.desde = documento.desde.substr(0,10);
        documento.desde = documento.desde.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');

        documento.hasta = documento.hasta.substr(0,10);
        documento.hasta = documento.hasta.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    });

    
}