jpeg("kid_complex.jpeg", width = 6, height = 4, units = "in", res = 600) #prints as jpeg image
ggplot(complex, aes(x = generation, y = empirical_stat, ymin = ci_lower, 
                    ymax = ci_upper, color = condition, label = condition)) + #empirical stat, ci lower and upper give you confidence intervals when you do a tidyboot_mean (which i would recommend you do)
  # geom_line(color="black")+
  geom_pointrange(position = position_dodge(.25))+ #this is not relevant to you because you have bar graph
  geom_smooth( span = 1.3, se = F, aes(group=type))+ #not relevant
  ylab("complexity") +
  scale_x_continuous(breaks=seq(0,6), limits = c(0, 8)) + #changes scale from auto one, you can put in character labels 
  # scale_y_continuous( limits = c(205, 240)) + #can be relevant to you
  theme_classic(base_size = 20) + #changes size of axes !! makes them more readable
  theme(plot.title = element_text(hjust = 0.5), legend.position = "none") + #takes away legend
  geom_dl(method = list(dl.trans(x = x + .2), "last.points", cex = 1.5)) + #adds direct labels to the graph instead of having a legend (really good for dotplots/line graphs)
  scale_color_manual(values=c("forestgreen","blue")) #changes colors of things
# scale_color_brewer(palette = "Set1") #I WOULD RECOMMEND YOU USE THESE COLORS INSTEAD OF THE ONES YOU PUT, THEY'RE MEANT TO BE MORE READABLE ON PPT
dev.off() #prints as jpeg image