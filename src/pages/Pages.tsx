import type {ReactNode} from "react";

type PagesProps = {
    children: ReactNode;
    title: string;
    description: string;
    image?: string;
}


const Pages = ({children, title, description, image}: PagesProps) => {
    return (
        <>
            <title>{title}</title>
            <meta name={description} content="Movie App"/>
            <link rel="icon" href={image}/>

            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>
            <meta property="og:type" content="movie"/>
            {children}
        </>
    )
}

export default Pages;