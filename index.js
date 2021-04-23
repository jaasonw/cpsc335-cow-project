const express = require('express')
const cors = require('cors')
const app = express()

app.get('/', (req, res) => {
    res.send(`
        This ain't for the best<br>
        My reputation's never been worse, so<br>
        You must like me for me...<br>
        We can't make<br>
        Any promises now, can we, babe?<br>
        But you can make me a drink<br>
        <br>
        Dive bar on the East Side, where you at?<br>
        Phone lights up my nightstand in the black<br>
        Come here, you can meet me in the back<br>
        Dark jeans and your Nikes, look at you<br>
        Oh damn, never seen that color blue<br>
        Just think of the fun things we could do<br>
        'Cause I like you<br>
        <br>
        This ain't for the best<br>
        My reputation's never been worse, so<br>
        You must like me for me...<br>
        Yeah, I want you<br>
        We can't make<br>
        Any promises now, can we, babe?<br>
        But you can make me a drink<br>
        <br>
        Is it cool that I said all that?<br>
        Is it chill that you're in my head?<br>
        'Cause I know that it's delicate (Delicate)<br>
        Is it cool that I said all that?<br>
        Is it too soon to do this yet?<br>
        'Cause I know that it's delicate<br>
        Isn't it? Isn't it? Isn't it?<br>
        Isn't it?<br>
        Isn't it? Isn't it? Isn't it?<br>
        Isn't it... delicate?<br>
        <br>
        Third floor on the West Side, me and you<br>
        Handsome, you're a mansion with a view<br>
        Do the girls back home touch you like I do?<br>
        Long night, with your hands up in my hair<br>
        Echoes of your footsteps on the stairs<br>
        Stay here, honey, I don't wanna share<br>
        'Cause I like you<br>
        <br>
        This ain't for the best<br>
        My reputation's never been worse, so<br>
        You must like me for me…<br>
        Yeah, I want you...<br>
        We can't make<br>
        Any promises now, can we, babe?<br>
        But you can make me a drink<br>
        <br>
        Is it cool that I said all that?<br>
        Is it chill that you're in my head?<br>
        'Cause I know that it's delicate (Delicate)<br>
        Is it cool that I said all that?<br>
        Is it too soon to do this yet?<br>
        'Cause I know that it's delicate<br>
        Isn't it? Isn't it? Isn't it?<br>
        Isn't it?<br>
        Isn't it? Isn't it? Isn't it?<br>
        Isn't it delicate?<br>
        <br>
        Sometimes I wonder when you sleep<br>
        Are you ever dreaming of me?<br>
        Sometimes when I look into your eyes<br>
        I pretend you're mine, all the damn time<br>
        'Cause I like you<br>
        <br>
        Is it cool that I said all that?<br>
        Is it chill that you're in my head?<br>
        'Cause I know that it's delicate (Delicate)<br>
        (Yeah, I want you)<br>
        Is it cool that I said all that?<br>
        Is it too soon to do this yet?<br>
        'Cause I know that it's delicate (Delicate)<br>
        'Cause I like you<br>
        Is it cool that I said all that?<br>
        Isn't it? Isn't it? Isn't it? Isn't it?<br>
        Is it chill that you're in my head?<br>
        Isn't it? Isn't it? Isn't it? Isn't it?<br>
        'Cause I know that it's delicate<br>
        Isn't it? Isn't it? Isn't it? Isn't it?<br>
        (Yeah, I want you)<br>
        Is it cool that I said all that?<br>
        Isn't it? Isn't it? Isn't it? Isn't it?<br>
        Is it too soon to do this yet?<br>
        Isn't it? Isn't it? Isn't it?<br>
        'Cause I know that it's delicate<br>
        Isn't it delicate?<br>
    `);
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Hosting server on port: ${PORT}`);
})