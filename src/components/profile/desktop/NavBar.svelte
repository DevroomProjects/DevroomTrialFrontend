<script>
    import { api } from "../../../storage";
</script>


<div class="flex flex-col bg-[#fff] h-[100vh] related">
    <div class="m-[40px] mr-[130px] min-w-[100px]">
        <img src="/images/logo.png" class="w-[100px]" alt="">
    </div>
    <div class="bg-[#C4C4C4] w-full h-[1px]"></div>
    <div class="flex flex-col mt-[27px]">
        <div class="flex cursor-pointer p-[12px] pl-[40px] pr-[40px]" style="background: rgba(45, 188, 59, .15);">
            <span class="text-[16px] font-[700]">Profile</span>
        </div>
        <div on:click={async (e) => {
            let req = await fetch(api.auth.logout, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            window.location.reload()
        }} class="flex cursor-pointer p-[12px] pl-[40px] pr-[40px] logout">
            <span class="text-[16px] font-[700] text-[#BC2D2D]">Logout</span>
        </div>
    </div>
    <div class="flex bottom-0 p-[40px] absolute" style="bottom: 0;">
        <div class="flex flex-col gap-[15px]">
            <div class="flex gap-[7px] items-center">
                <img src="/images/email.png" alt="">
                <span>support@koper.pw</span>
            </div>
            <div class="flex gap-[7px] items-center">
                <img src="/images/phone.png" alt="">
                <span>+1 (999) 999-99-99</span>
            </div>
        </div>
    </div>
</div>

<style>
    .logout{
        transition: .3s ease;
    }

    .logout:hover{
        background-color: rgba(188, 45, 45, .15);
    }
</style>