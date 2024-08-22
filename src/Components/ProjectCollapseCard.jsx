import React from "react";

function ProjectCollapseCard ({title, description, tech_stack, label_id, url=null})
{
    if (url != null)
    {
        return (
            <section class="accordion">
                    <input type="checkbox" name="collapse" id= {label_id}/>
                    <h2 class="handle">
                        <label for= {label_id}> {title} </label>
                    </h2>
                    <div class="content">
                        <p><strong>Description:</strong> {description} </p>
                        <p><strong>Technologies Used:</strong> {tech_stack}</p>
                        <p className="accordionURL" src = {url}> Learn More </p>
                    </div>
            </section>
        )
    }
    return (
        <section class="accordion">
                <input type="checkbox" name="collapse" id= {label_id}/>
                <h2 class="handle">
                    <label for= {label_id}> {title} </label>
                </h2>
                <div class="content">
                    <p><strong>Description:</strong> {description} </p>
                    <p><strong>Technologies Used:</strong> {tech_stack}</p>
                </div>
        </section>
    )
}

export default ProjectCollapseCard;