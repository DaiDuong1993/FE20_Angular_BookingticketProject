import Sweet from 'sweetalert2';

export class SweetAlertService{
    public static showMessageConfirm(callback,object:any={},title:string="",text:any="",types:any='success', confirmButtonText:string="Xac Nhan",  ){
       return Sweet.fire({
            title: title,
            text: text,
            type: types,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
          }).then((result) => {
            if(result.value){
                callback(object);
            }
          });
          
        
    }
}